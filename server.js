'use strict';
/*
 * Noor Nest server: static files + parent accounts + progress sync.
 * No framework. Optional dependency: "pg" (used only when DATABASE_URL is set).
 *
 * Security notes (see README "Security" for the plain-language version):
 *  - passwords: scrypt with a random salt per user, constant-time compare
 *  - sessions: 256-bit random token in an HttpOnly, SameSite=Strict cookie; only a SHA-256 hash is stored
 *  - CSRF: SameSite=Strict + required custom header + Origin check on every write
 *  - brute force: per-IP and per-account throttling with lockout
 *  - input: strict size limits, JSON only, schema-sanitised progress document
 *  - headers: CSP without inline scripts, no-sniff, no-referrer, frame-ancestors none, HSTS on https
 */
const http = require('http');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const PORT = +process.env.PORT || 3000;
const PROD = process.env.NODE_ENV === 'production';
const DATA_DIR = process.env.DATA_DIR || path.join(__dirname, 'data');
const PUBLIC = path.join(__dirname, 'public');
const MAX_BODY = 256 * 1024;
const SESSION_DAYS = 30;
const MAX_SESSIONS_PER_USER = 5;

/* ---------- small helpers ---------- */
const b64u = buf => Buffer.from(buf).toString('base64url');
const sha256 = s => crypto.createHash('sha256').update(s).digest('hex');
const now = () => Date.now();
const safeEq = (a, b) => { const x = Buffer.from(String(a)), y = Buffer.from(String(b)); return x.length === y.length && crypto.timingSafeEqual(x, y); };

function scryptHash(secret, saltB64) {
  const salt = saltB64 ? Buffer.from(saltB64, 'base64url') : crypto.randomBytes(16);
  return new Promise((res, rej) => crypto.scrypt(secret, salt, 64, { N: 16384, r: 8, p: 1, maxmem: 64 * 1024 * 1024 }, (e, key) => e ? rej(e) : res(b64u(salt) + '$' + b64u(key))));
}
async function scryptVerify(secret, stored) {
  const [salt, hash] = String(stored).split('$'); if (!salt || !hash) return false;
  const again = await scryptHash(secret, salt);
  return safeEq(again.split('$')[1], hash);
}
const DUMMY = scryptHash('dummy-password-for-timing', null); // promise, awaited on unknown accounts so timing doesn't reveal them

/* ---------- storage: JSON file by default, Postgres when DATABASE_URL is set ---------- */
function fileStore() {
  fs.mkdirSync(DATA_DIR, { recursive: true });
  const file = path.join(DATA_DIR, 'db.json');
  let db = { users: {}, byEmail: {}, sessions: {}, states: {} };
  try { db = Object.assign(db, JSON.parse(fs.readFileSync(file, 'utf8'))); } catch (e) {}
  let timer = null;
  const flush = () => { timer = null; const tmp = file + '.tmp'; fs.writeFileSync(tmp, JSON.stringify(db), { mode: 0o600 }); fs.renameSync(tmp, file); };
  const persist = () => { if (!timer) timer = setTimeout(flush, 150); };
  process.on('SIGTERM', () => { if (timer) flush(); process.exit(0); });
  return {
    kind: 'file',
    async createUser(u) { if (db.byEmail[u.email]) return false; db.users[u.id] = u; db.byEmail[u.email] = u.id; persist(); return true; },
    async userByEmail(e) { const id = db.byEmail[e]; return id ? db.users[id] : null; },
    async userById(id) { return db.users[id] || null; },
    async updateUser(id, patch) { Object.assign(db.users[id], patch); persist(); },
    async deleteUser(id) { const u = db.users[id]; if (!u) return; delete db.byEmail[u.email]; delete db.users[id]; delete db.states[id]; for (const h of Object.keys(db.sessions)) if (db.sessions[h].uid === id) delete db.sessions[h]; persist(); },
    async addSession(hash, uid, exp) {
      db.sessions[hash] = { uid, exp };
      const mine = Object.entries(db.sessions).filter(([, s]) => s.uid === uid).sort((a, b) => a[1].exp - b[1].exp);
      while (mine.length > MAX_SESSIONS_PER_USER) delete db.sessions[mine.shift()[0]];
      persist();
    },
    async getSession(hash) { const s = db.sessions[hash]; if (!s) return null; if (s.exp < now()) { delete db.sessions[hash]; persist(); return null; } return s; },
    async delSession(hash) { delete db.sessions[hash]; persist(); },
    async delUserSessions(uid, except) { for (const h of Object.keys(db.sessions)) if (db.sessions[h].uid === uid && h !== except) delete db.sessions[h]; persist(); },
    async getState(uid) { return db.states[uid] || null; },
    async putState(uid, rev, doc) { db.states[uid] = { rev, doc, at: now() }; persist(); },
    async sweep() { const t = now(); for (const h of Object.keys(db.sessions)) if (db.sessions[h].exp < t) delete db.sessions[h]; persist(); },
    async close() { if (timer) flush(); }
  };
}
function pgStore(url) {
  const { Pool } = require('pg');
  const pool = new Pool({ connectionString: url, ssl: /localhost|127\.0\.0\.1/.test(url) || process.env.PGSSL === 'off' ? false : { rejectUnauthorized: false }, max: 5 });
  const q = (text, args) => pool.query(text, args);
  const ready = (async () => {
    await q('CREATE TABLE IF NOT EXISTS nn_users (id text PRIMARY KEY, email text UNIQUE NOT NULL, pw text NOT NULL, rec text NOT NULL, created bigint NOT NULL)');
    await q('CREATE TABLE IF NOT EXISTS nn_sessions (hash text PRIMARY KEY, uid text NOT NULL REFERENCES nn_users(id) ON DELETE CASCADE, exp bigint NOT NULL)');
    await q('CREATE TABLE IF NOT EXISTS nn_states (uid text PRIMARY KEY REFERENCES nn_users(id) ON DELETE CASCADE, rev integer NOT NULL, doc jsonb NOT NULL, at bigint NOT NULL)');
  })();
  const row = r => r.rows[0] || null;
  return {
    kind: 'postgres', ready,
    async createUser(u) { try { await q('INSERT INTO nn_users(id,email,pw,rec,created) VALUES($1,$2,$3,$4,$5)', [u.id, u.email, u.pw, u.rec, u.created]); return true; } catch (e) { if (e.code === '23505') return false; throw e; } },
    async userByEmail(e) { return row(await q('SELECT * FROM nn_users WHERE email=$1', [e])); },
    async userById(id) { return row(await q('SELECT * FROM nn_users WHERE id=$1', [id])); },
    async updateUser(id, patch) { for (const k of Object.keys(patch)) { if (!['pw', 'rec'].includes(k)) throw new Error('bad field'); await q('UPDATE nn_users SET ' + k + '=$1 WHERE id=$2', [patch[k], id]); } },
    async deleteUser(id) { await q('DELETE FROM nn_users WHERE id=$1', [id]); },
    async addSession(hash, uid, exp) {
      await q('INSERT INTO nn_sessions(hash,uid,exp) VALUES($1,$2,$3)', [hash, uid, exp]);
      await q('DELETE FROM nn_sessions WHERE uid=$1 AND hash NOT IN (SELECT hash FROM nn_sessions WHERE uid=$1 ORDER BY exp DESC LIMIT $2)', [uid, MAX_SESSIONS_PER_USER]);
    },
    async getSession(hash) { const s = row(await q('SELECT uid, exp FROM nn_sessions WHERE hash=$1', [hash])); if (!s) return null; s.exp = +s.exp; if (s.exp < now()) { await q('DELETE FROM nn_sessions WHERE hash=$1', [hash]); return null; } return s; },
    async delSession(hash) { await q('DELETE FROM nn_sessions WHERE hash=$1', [hash]); },
    async delUserSessions(uid, except) { await q('DELETE FROM nn_sessions WHERE uid=$1 AND hash<>$2', [uid, except || '']); },
    async getState(uid) { const r = row(await q('SELECT rev, doc, at FROM nn_states WHERE uid=$1', [uid])); return r ? { rev: r.rev, doc: r.doc, at: +r.at } : null; },
    async putState(uid, rev, doc) { await q('INSERT INTO nn_states(uid,rev,doc,at) VALUES($1,$2,$3,$4) ON CONFLICT (uid) DO UPDATE SET rev=$2, doc=$3, at=$4', [uid, rev, JSON.stringify(doc), now()]); },
    async sweep() { await q('DELETE FROM nn_sessions WHERE exp<$1', [now()]); },
    async close() { await pool.end(); }
  };
}

/* ---------- throttling (in memory; fine for a single small instance) ---------- */
function limiter(max, windowMs) {
  const hits = new Map();
  const check = key => { const t = now(), a = (hits.get(key) || []).filter(x => t - x < windowMs); a.push(t); hits.set(key, a); return a.length <= max; };
  const peek = key => { const t = now(); return (hits.get(key) || []).filter(x => t - x < windowMs).length >= max; };
  const clear = key => hits.delete(key);
  setInterval(() => { const t = now(); for (const [k, a] of hits) if (!a.some(x => t - x < windowMs)) hits.delete(k); }, 60000).unref();
  return { check, peek, clear };
}
const ipLimit = limiter(120, 60 * 1000);          // all API calls
const authIpLimit = limiter(20, 10 * 60 * 1000);  // login/register/recover per IP
const acctFail = limiter(8, 15 * 60 * 1000);      // failed logins per account (lockout 15 min)

/* ---------- validation ---------- */
const EMAIL_RE = /^[^\s@]{1,64}@[^\s@]{1,190}\.[^\s@]{2,}$/;
const COMMON = new Set(['password', '12345678', '123456789', 'qwertyui', '11111111', 'iloveyou', 'password1', 'azertyui', '00000000', 'motdepasse']);
function checkPassword(p) {
  if (typeof p !== 'string') return 'weak';
  if (p.length < 8 || p.length > 128) return 'weak';
  if (COMMON.has(p.toLowerCase())) return 'weak';
  if (/^(.)\1+$/.test(p)) return 'weak';
  return null;
}
const cleanEmail = e => (typeof e === 'string' ? e.trim().toLowerCase() : '');

/* progress document: whitelist keys, cap sizes, never trust the client's shape */
const num = (v, lo, hi, d) => (Number.isFinite(+v) ? Math.min(hi, Math.max(lo, Math.trunc(+v))) : d);
const KEYRE = /^\d{1,3}:\d{1,3}$/;
const DAYRE = /^\d{4}-\d{2}-\d{2}$/;
function sanitizeState(x) {
  if (!x || typeof x !== 'object' || Array.isArray(x)) return null;
  const o = {};
  o.lang = ['en', 'fr', 'ar'].includes(x.lang) ? x.lang : 'en';
  o.sound = x.sound !== false; o.mic = x.mic === true; o.more = x.more === true; o.tour = x.tour === true;
  o.kid = x.kid === 'girl' ? 'girl' : 'boy';
  o.mode = ['little', 'big'].includes(x.mode) ? x.mode : '';
  o.stars = num(x.stars, 0, 100000, 0);
  o.cards = {}; o.done = {}; o.weak = {}; o.seed = {}; o.log = {};
  let n = 0;
  for (const k of Object.keys(x.cards || {})) { if (!KEYRE.test(k) || ++n > 400) continue; const c = x.cards[k] || {}; o.cards[k] = { s: num(c.s, 1, 114, 1), a: num(c.a, 1, 300, 1), box: num(c.box, 1, 5, 1), due: num(c.due, 0, 4102444800000, 0) }; }
  n = 0; for (const k of Object.keys(x.done || {})) { if (KEYRE.test(k) && x.done[k] && ++n <= 400) o.done[k] = true; }
  n = 0; for (const k of Object.keys(x.weak || {})) {
    if (!KEYRE.test(k) || ++n > 400) continue; const w = {}; let m = 0;
    for (const i of Object.keys(x.weak[k] || {})) { if (/^\d{1,3}$/.test(i) && ++m <= 80) w[i] = num(x.weak[k][i], 0, 999, 0); }
    o.weak[k] = w;
  }
  const days = Object.keys(x.log || {}).filter(d => DAYRE.test(d)).sort().slice(-120);
  for (const d of days) { const e = x.log[d] || {}; o.log[d] = { ayahs: num(e.ayahs, 0, 9999, 0), reviews: num(e.reviews, 0, 9999, 0), stars: num(e.stars, 0, 9999, 0), recites: num(e.recites, 0, 9999, 0) }; }
  const st = x.streak || {};
  o.streak = { last: DAYRE.test(st.last) ? st.last : '', count: num(st.count, 0, 9999, 0) };
  return o;
}

/* ---------- HTTP plumbing ---------- */
const MIME = { '.html': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.svg': 'image/svg+xml', '.png': 'image/png', '.webmanifest': 'application/manifest+json', '.json': 'application/json' };
const FILES = {};
function loadFiles() {
  for (const f of fs.readdirSync(PUBLIC)) { const p = path.join(PUBLIC, f); if (fs.statSync(p).isFile()) FILES['/' + f] = { buf: fs.readFileSync(p), type: MIME[path.extname(f)] || 'application/octet-stream', etag: '"' + sha256(fs.readFileSync(p)).slice(0, 16) + '"' }; }
  FILES['/'] = FILES['/index.html'];
  /* Android app (TWA) proof of ownership: put the file PWABuilder gives you at public/assetlinks.json */
  if (FILES['/assetlinks.json']) FILES['/.well-known/assetlinks.json'] = FILES['/assetlinks.json'];
}
const CSP = [
  "default-src 'none'",
  "script-src 'self'",
  "style-src 'self' https://fonts.googleapis.com",
  "style-src-attr 'unsafe-inline'",
  "font-src https://fonts.gstatic.com",
  "img-src 'self' data:",
  "media-src https://everyayah.com https://*.everyayah.com blob:",
  "connect-src 'self' https://ummahapi.com",
  "manifest-src 'self'",
  "worker-src 'self'",
  "base-uri 'none'",
  "form-action 'self'",
  "frame-ancestors 'none'",
  "object-src 'none'"
].join('; ');
function secHeaders(res, https) {
  res.setHeader('Content-Security-Policy', CSP);
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('Referrer-Policy', 'no-referrer');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('Cross-Origin-Opener-Policy', 'same-origin');
  res.setHeader('Cross-Origin-Resource-Policy', 'same-origin');
  res.setHeader('Permissions-Policy', 'microphone=(self), camera=(), geolocation=(), payment=(), usb=()');
  if (https) res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');
}
const isHttps = req => !!(req.socket.encrypted || String(req.headers['x-forwarded-proto'] || '').split(',')[0].trim() === 'https');
/* behind Render's proxy set TRUST_PROXY=1 so the real client IP (last hop added by the proxy) is used for throttling */
const clientIp = req => { if (process.env.TRUST_PROXY === '1') { const xs = String(req.headers['x-forwarded-for'] || '').split(',').map(x => x.trim()).filter(Boolean); if (xs.length) return xs[xs.length - 1]; } return req.socket.remoteAddress || 'unknown'; };

function send(res, status, obj, extra) {
  const body = JSON.stringify(obj);
  res.writeHead(status, Object.assign({ 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store', 'Content-Length': Buffer.byteLength(body) }, extra || {}));
  res.end(body);
}
function readJson(req) {
  return new Promise((resolve, reject) => {
    const ct = String(req.headers['content-type'] || '');
    if (!/^application\/json\b/i.test(ct)) return reject({ status: 415, error: 'json_only' });
    let size = 0; const chunks = [];
    req.on('data', c => { size += c.length; if (size > MAX_BODY) { reject({ status: 413, error: 'too_large' }); req.destroy(); } else chunks.push(c); });
    req.on('end', () => { try { const t = Buffer.concat(chunks).toString('utf8'); resolve(t ? JSON.parse(t) : {}); } catch (e) { reject({ status: 400, error: 'bad_json' }); } });
    req.on('error', () => reject({ status: 400, error: 'bad_request' }));
  });
}
function parseCookies(req) { const out = {}; String(req.headers.cookie || '').split(';').forEach(p => { const i = p.indexOf('='); if (i > 0) out[p.slice(0, i).trim()] = p.slice(i + 1).trim(); }); return out; }
function cookieName(https) { return https ? '__Host-nn_sid' : 'nn_sid'; }
function setSession(res, https, token) {
  const parts = [cookieName(https) + '=' + token, 'Path=/', 'HttpOnly', 'SameSite=Strict', 'Max-Age=' + SESSION_DAYS * 86400];
  if (https) parts.push('Secure');
  res.setHeader('Set-Cookie', parts.join('; '));
}
function clearSession(res, https) { res.setHeader('Set-Cookie', cookieName(https) + '=; Path=/; HttpOnly; SameSite=Strict; Max-Age=0' + (https ? '; Secure' : '')); }

function sameOrigin(req) {
  const origin = req.headers.origin; if (!origin) return true; // same-origin fetches from some browsers omit it; the custom header + SameSite still protect
  try { return new URL(origin).host === req.headers.host; } catch (e) { return false; }
}

/* ---------- app ---------- */
function createApp(store) {
  async function newSession(res, https, uid) {
    const token = b64u(crypto.randomBytes(32));
    await store.addSession(sha256(token), uid, now() + SESSION_DAYS * 86400000);
    setSession(res, https, token);
  }
  async function auth(req, https) {
    const tok = parseCookies(req)[cookieName(https)]; if (!tok || tok.length > 80) return null;
    const hash = sha256(tok), s = await store.getSession(hash); if (!s) return null;
    const user = await store.userById(s.uid); if (!user) return null;
    return { user, hash };
  }
  const recoveryCode = () => { const a = 'ABCDEFGHJKMNPQRSTUVWXYZ23456789', b = crypto.randomBytes(16); let s = ''; for (let i = 0; i < 12; i++) s += a[b[i] % a.length]; return s.slice(0, 4) + '-' + s.slice(4, 8) + '-' + s.slice(8, 12); };
  const normRec = c => String(c || '').toUpperCase().replace(/[^A-Z0-9]/g, '');

  async function api(req, res, url, https) {
    const ip = clientIp(req), m = req.method, p = url.pathname;
    if (!ipLimit.check(ip)) return send(res, 429, { error: 'slow_down' });
    if (m !== 'GET' && m !== 'HEAD') {
      if (req.headers['x-requested-with'] !== 'noornest' || !sameOrigin(req)) return send(res, 403, { error: 'forbidden' });
    }
    const AUTHISH = ['/api/register', '/api/login', '/api/recover'];
    if (m === 'POST' && AUTHISH.includes(p) && !authIpLimit.check(ip)) return send(res, 429, { error: 'slow_down' });

    if (m === 'GET' && p === '/api/health') return send(res, 200, { ok: true, store: store.kind });

    if (m === 'POST' && p === '/api/register') {
      const b = await readJson(req), email = cleanEmail(b.email);
      if (!EMAIL_RE.test(email)) return send(res, 400, { error: 'bad_email' });
      if (checkPassword(b.password)) return send(res, 400, { error: 'weak_password' });
      const code = recoveryCode();
      const user = { id: b64u(crypto.randomBytes(12)), email, pw: await scryptHash(b.password), rec: await scryptHash(normRec(code)), created: now() };
      if (!(await store.createUser(user))) return send(res, 409, { error: 'email_taken' });
      await newSession(res, https, user.id);
      return send(res, 201, { user: { email }, recoveryCode: code }, res.getHeader('Set-Cookie') ? { 'Set-Cookie': res.getHeader('Set-Cookie') } : {});
    }
    if (m === 'POST' && p === '/api/login') {
      const b = await readJson(req), email = cleanEmail(b.email), pw = typeof b.password === 'string' ? b.password.slice(0, 200) : '';
      if (acctFail.peek(email)) return send(res, 429, { error: 'locked' });
      const user = EMAIL_RE.test(email) ? await store.userByEmail(email) : null;
      const okPw = user ? await scryptVerify(pw, user.pw) : (await scryptVerify(pw, await DUMMY), false);
      if (!user || !okPw) { acctFail.check(email); return send(res, 401, { error: 'bad_login' }); }
      acctFail.clear(email);
      await newSession(res, https, user.id);
      return send(res, 200, { user: { email: user.email } }, { 'Set-Cookie': res.getHeader('Set-Cookie') });
    }
    if (m === 'POST' && p === '/api/recover') {
      const b = await readJson(req), email = cleanEmail(b.email);
      if (acctFail.peek('rec:' + email)) return send(res, 429, { error: 'locked' });
      if (checkPassword(b.password)) return send(res, 400, { error: 'weak_password' });
      const user = EMAIL_RE.test(email) ? await store.userByEmail(email) : null;
      const ok = user ? await scryptVerify(normRec(b.code), user.rec) : (await scryptVerify('x', await DUMMY), false);
      if (!ok) { acctFail.check('rec:' + email); return send(res, 401, { error: 'bad_code' }); }
      acctFail.clear('rec:' + email);
      const code = recoveryCode();
      await store.updateUser(user.id, { pw: await scryptHash(b.password), rec: await scryptHash(normRec(code)) });
      await store.delUserSessions(user.id);
      await newSession(res, https, user.id);
      return send(res, 200, { user: { email: user.email }, recoveryCode: code }, { 'Set-Cookie': res.getHeader('Set-Cookie') });
    }

    const a = await auth(req, https);
    if (m === 'GET' && p === '/api/me') return a ? send(res, 200, { user: { email: a.user.email } }) : send(res, 200, { user: null });
    if (!a) return send(res, 401, { error: 'login_required' });

    if (m === 'POST' && p === '/api/logout') { await store.delSession(a.hash); clearSession(res, https); return send(res, 200, { ok: true }, { 'Set-Cookie': res.getHeader('Set-Cookie') }); }
    if (m === 'GET' && p === '/api/state') { const s = await store.getState(a.user.id); return send(res, 200, s ? { rev: s.rev, state: s.doc } : { rev: 0, state: null }); }
    if (m === 'PUT' && p === '/api/state') {
      const b = await readJson(req), doc = sanitizeState(b.state);
      if (!doc) return send(res, 400, { error: 'bad_state' });
      const cur = await store.getState(a.user.id), curRev = cur ? cur.rev : 0;
      if (num(b.rev, 0, 1e9, -1) !== curRev) return send(res, 409, { error: 'conflict', rev: curRev, state: cur ? cur.doc : null });
      await store.putState(a.user.id, curRev + 1, doc);
      return send(res, 200, { rev: curRev + 1 });
    }
    if (m === 'POST' && p === '/api/password') {
      const b = await readJson(req);
      if (acctFail.peek('pw:' + a.user.id)) return send(res, 429, { error: 'locked' });
      if (!(await scryptVerify(String(b.current || '').slice(0, 200), a.user.pw))) { acctFail.check('pw:' + a.user.id); return send(res, 401, { error: 'bad_login' }); }
      if (checkPassword(b.password)) return send(res, 400, { error: 'weak_password' });
      await store.updateUser(a.user.id, { pw: await scryptHash(b.password) });
      await store.delUserSessions(a.user.id, a.hash);
      return send(res, 200, { ok: true });
    }
    if (m === 'DELETE' && p === '/api/account') {
      const b = await readJson(req);
      if (acctFail.peek('pw:' + a.user.id)) return send(res, 429, { error: 'locked' });
      if (!(await scryptVerify(String(b.password || '').slice(0, 200), a.user.pw))) { acctFail.check('pw:' + a.user.id); return send(res, 401, { error: 'bad_login' }); }
      await store.deleteUser(a.user.id); clearSession(res, https);
      return send(res, 200, { ok: true }, { 'Set-Cookie': res.getHeader('Set-Cookie') });
    }
    return send(res, 404, { error: 'not_found' });
  }

  return async function handler(req, res) {
    const https = isHttps(req);
    secHeaders(res, https);
    let url;
    try { url = new URL(req.url, 'http://x'); } catch (e) { res.writeHead(400); return res.end(); }
    if (PROD && !https && process.env.FORCE_HTTPS !== '0' && req.headers.host && !/^(localhost|127\.)/.test(req.headers.host)) {
      res.writeHead(308, { Location: 'https://' + req.headers.host + req.url }); return res.end();
    }
    try {
      if (url.pathname.startsWith('/api/')) return await api(req, res, url, https);
      if (req.method !== 'GET' && req.method !== 'HEAD') { res.writeHead(405, { Allow: 'GET, HEAD' }); return res.end(); }
      const f = FILES[url.pathname];
      if (!f) { const nf = FILES['/404'] || null; res.writeHead(404, { 'Content-Type': 'text/plain' }); return res.end('Not found'); }
      const isSw = url.pathname === '/sw.js';
      const h = { 'Content-Type': f.type, ETag: f.etag, 'Cache-Control': isSw || url.pathname === '/' || url.pathname === '/index.html' ? 'no-cache' : 'public, max-age=3600' };
      if (req.headers['if-none-match'] === f.etag) { res.writeHead(304, h); return res.end(); }
      h['Content-Length'] = f.buf.length; res.writeHead(200, h);
      return res.end(req.method === 'HEAD' ? undefined : f.buf);
    } catch (e) {
      if (e && e.status) return send(res, e.status, { error: e.error });
      console.error('error', e && e.message);
      if (!res.headersSent) send(res, 500, { error: 'server_error' }); else res.end();
    }
  };
}

async function start(opts) {
  opts = opts || {};
  loadFiles();
  if (PROD && !process.env.DATABASE_URL && !opts.store) console.warn('WARNING: no DATABASE_URL set. Accounts are stored in a local file that Render erases on every restart. Add a Postgres database.');
  const store = opts.store || (process.env.DATABASE_URL ? pgStore(process.env.DATABASE_URL) : fileStore());
  if (store.ready) await store.ready;
  const server = http.createServer(createApp(store));
  server.headersTimeout = 15000; server.requestTimeout = 20000; server.keepAliveTimeout = 5000;
  const sweeper = setInterval(() => store.sweep().catch(() => {}), 3600 * 1000); sweeper.unref();
  await new Promise(r => server.listen(opts.port == null ? PORT : opts.port, r));
  return { server, store, port: server.address().port, close: async () => { clearInterval(sweeper); await new Promise(r => server.close(r)); await store.close(); } };
}
if (require.main === module) start().then(s => console.log('Noor Nest listening on ' + s.port + ' (store: ' + s.store.kind + ')')).catch(e => { console.error(e); process.exit(1); });
module.exports = { start, sanitizeState, checkPassword };
