# Noor Nest

A phone-first Quran memorization app for children (ages 5 to 12). Quran text and audio come from [UmmahAPI](https://ummahapi.com).

**Built by:** edit the `AUTHORS` constant at the top of `public/app.js` and put your name (or both names).

## What it does

- **A reader who recites.** A boy or a girl (your artwork) recites each ayah. A speech bubble pops up with the ayah and the words light up with the audio; the mouth moves and they blink.
- **Quick start tour.** On first open: pick the reader and the age group, and the first ayah starts reciting at once.
- **Games.** Catch the fireflies (word order), fill the blanks (8 to 12), listen-and-repeat part by part, then say it to Noor.
- **A pet that grows**, stars, streaks, spaced review, and "tricky words" practice.
- **Listens and corrects (optional mic).** If the child slips, the reader tilts its head ("Almost! Say it again"); when it is fixed, confetti and a cheer. The app keeps listening across the browser's own session breaks, and has a Start over button.
- **Parent corner** (behind a small maths gate): weekly report, tricky words, age mode, account settings.
- **Accounts for parents**, progress synced between phones, works offline once opened, installable on Android and iPhone.

## Security, in plain language

| What | How |
|---|---|
| Passwords | Never stored. Only a salted `scrypt` hash. 8+ characters, common passwords refused. |
| Login sessions | Random 256-bit token in an `HttpOnly`, `SameSite=Strict`, `Secure` cookie (page scripts cannot read it). Only a hash of the token is stored. Logout and password change end sessions. |
| Forgotten password | A one-time recovery code shown at sign-up (no email service needed). Using it issues a new code and signs out every other device. |
| Brute force | Per-IP and per-account throttling; an account locks for 15 minutes after 8 wrong tries. Unknown accounts take the same time and give the same message as wrong passwords. |
| CSRF | `SameSite=Strict`, a required custom header, an Origin check and JSON-only bodies on every change. |
| Injection / XSS | No inline scripts allowed by the Content-Security-Policy; all text shown is escaped; the server rebuilds the progress data from a strict whitelist and ignores anything else. |
| Other headers | `X-Content-Type-Options`, `Referrer-Policy: no-referrer`, `frame-ancestors 'none'`, HSTS on https, no directory listing, only files in `public/` are served. |
| Children's data | Only the parent's email and learning progress (stars, ayahs, tricky words). No names, ages, photos or recordings. Parents must tick a consent box (18+). Delete account erases everything. |
| Logout on shared phones | Logging out removes the account's cached data from the phone. |

**Honest limits.** No email verification (it would need an email service), so anyone can sign up with any address; the recovery code replaces email resets. The microphone is optional: if switched on, the browser (for example Chrome) may send the sound to its own speech service. Google Fonts is loaded for the nicer fonts; delete the `<link>` in `public/index.html` to avoid that (system fonts are used instead). The voice is an adult reciter, not a child's. Run `npm audit` before any real launch, and have your teacher or a security-minded friend review it.

## Run it on your computer

1. Install Node.js 18 or newer from https://nodejs.org (the LTS button).
2. In a terminal inside this folder:
   ```
   npm install
   npm start
   ```
3. Open http://localhost:3000

Without `DATABASE_URL` the accounts are kept in `data/db.json` (fine for trying it out).

## Put it on GitHub

Create an empty repository on github.com, then upload the **contents** of this folder (not the folder itself): `server.js`, `package.json`, `render.yaml`, `public/`, `test/`, `README.md`, `.gitignore`, `data/.gitkeep`. Do not upload `node_modules`.

## Deploy on Render (web service + free database)

Accounts need a server, so this is a **Web Service**, not a Static Site.

1. On https://render.com sign in with GitHub.
2. **New > PostgreSQL**. Name `noor-nest-db`, plan **Free**, create. When it is ready, copy the **Internal Database URL**.
3. **New > Web Service**, pick your repository. Settings:
   - Runtime: **Node**
   - Build command: `npm install`
   - Start command: `node server.js`
   - Instance type: **Free**
4. Under **Environment**, add:
   - `NODE_ENV` = `production`
   - `TRUST_PROXY` = `1`
   - `DATABASE_URL` = the Internal Database URL from step 2
5. Create. When the log says "Noor Nest listening", open the `.onrender.com` link.

(The repository also contains a `render.yaml` blueprint with the same settings.)

Notes: the free web service sleeps after about 15 minutes without visitors, so the first open can take up to a minute; open it yourself a few minutes before a demo. Free Render databases expire after a limited time (check the dashboard); a free Postgres from Neon or Supabase also works, just paste its connection string into `DATABASE_URL`. Without `DATABASE_URL` Render erases accounts whenever the service restarts.

## Android app (APK)

The quickest honest route is the installable web app: open the link in Chrome on Android, menu, **Install app** (or **Add to Home screen**). It then opens full screen with its own icon.

For a real `.apk` file (this could not be built in the workspace used to write the app, because it needs Android tooling):

1. Deploy first, so you have the `https://....onrender.com` link.
2. Go to https://www.pwabuilder.com, paste the link, press **Start**, then **Package for stores > Android**.
3. Download the package. It contains an `.apk` you can install on a phone and a `signing-key` you must keep.
4. PWABuilder shows a small JSON ("Digital Asset Links"). Save it as `public/assetlinks.json` in your repository and redeploy; the server then publishes it at `/.well-known/assetlinks.json`, which removes the browser address bar from the Android app.

## Tests

```
npm test                    # server and security tests (11)
node test/e2e.js x shots    # browser end-to-end tests against the real server (needs Playwright)
```

`test/ui.js` holds the older screen-by-screen checks (needs Playwright; run it with the folder that contains `app/` as its argument).

## Credits

Quran data and API: UmmahAPI. Reader artwork: supplied by the app's author (make sure you have the right to use it).
