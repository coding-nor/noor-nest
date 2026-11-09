/* Noor Nest service worker: the app opens offline; Quran text is kept after first load. Accounts and sync always go to the network. */
const V = 'nn-v7';
const SHELL = ['/', '/index.html', '/app.css', '/app.js', '/kids.js', '/deen.js', '/fun.js', '/manifest.webmanifest', '/icon.svg', '/icon-192.png', '/icon-512.png'];
self.addEventListener('install', e => { e.waitUntil(caches.open(V).then(c => c.addAll(SHELL)).then(() => self.skipWaiting())); });
self.addEventListener('activate', e => { e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== V).map(k => caches.delete(k)))).then(() => self.clients.claim())); });
self.addEventListener('fetch', e => {
  const req = e.request; if (req.method !== 'GET') return;
  const url = new URL(req.url);
  if (url.origin === location.origin) {
    if (url.pathname.startsWith('/api/')) return; // never cache account or progress calls
    e.respondWith(caches.open(V).then(async c => {
      const hit = await c.match(req, { ignoreSearch: true });
      const net = fetch(req).then(r => { if (r.ok) c.put(req, r.clone()); return r; }).catch(() => hit || (req.mode === 'navigate' ? c.match('/index.html') : Response.error()));
      return hit || net;
    }));
  } else if (url.hostname === 'ummahapi.com') {
    e.respondWith(caches.open(V + '-quran').then(async c => {
      try { const r = await fetch(req); if (r.ok) c.put(req, r.clone()); return r; } catch (err) { const hit = await c.match(req); if (hit) return hit; throw err; }
    }));
  }
});
