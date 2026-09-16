// Cloudflare Pages Function — runs on every request to /screen and /screen/*
// BEFORE the static file is served. Gates the in-restaurant staff screen
// behind a custom, French, on-brand login page (NOT the browser's native
// Basic Auth popup — that dialog is drawn by the browser itself, so its
// language and design can't be controlled from here).
//
// How it works: a login form (this file renders its own HTML for it) posts
// to /screen/login. On a correct match against the STAFF_USER / STAFF_PASS
// environment variables, this sets a signed, HttpOnly session cookie and
// redirects to /screen/. Every later request to /screen/* checks that
// cookie's signature (HMAC-SHA256, keyed with STAFF_PASS) before letting
// the request through to the actual static file — nothing is stored
// server-side, so there's no database or KV involved.
//
// Setup (one-time, in the Cloudflare dashboard — not something this repo can
// do for you): Pages project → Settings → Environment variables → add
// STAFF_USER (Text) and STAFF_PASS (Secret) → redeploy. See
// SUPABASE_SETUP.md, step 6.

const COOKIE_NAME = 'moe_staff_session';
const SESSION_DAYS = 30;

async function sign(message, secret) {
  const enc = new TextEncoder();
  const key = await crypto.subtle.importKey('raw', enc.encode(secret), { name: 'HMAC', hash: 'SHA-256' }, false, ['sign']);
  const sigBuf = await crypto.subtle.sign('HMAC', key, enc.encode(message));
  return [...new Uint8Array(sigBuf)].map((b) => b.toString(16).padStart(2, '0')).join('');
}

function parseCookies(header) {
  const out = {};
  (header || '').split(';').forEach((part) => {
    const idx = part.indexOf('=');
    if (idx === -1) return;
    out[part.slice(0, idx).trim()] = decodeURIComponent(part.slice(idx + 1).trim());
  });
  return out;
}

function loginPageHtml({ error } = {}) {
  return `<!doctype html>
<html lang="fr">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>Connexion — Moë Tea Room</title>
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Bodoni+Moda:opsz,wght@6..96,500;6..96,600;6..96,700&family=Inter:wght@400;500;600;700&display=swap" />
<style>
  :root {
    --bg: #F7F0DC;
    --surface: #FFFCF3;
    --brown: #6B4A34;
    --brown-dark: #4A2F1F;
    --green: #3F5D45;
    --text: #3A2A1E;
    --text-muted: #7A6A57;
    --border: rgba(58,42,30,0.16);
    --danger: #A33A2E;
  }
  * { box-sizing: border-box; }
  html { -webkit-font-smoothing: antialiased; }
  body {
    margin: 0;
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 24px;
    font-family: 'Inter', system-ui, sans-serif;
    background:
      radial-gradient(ellipse at top, rgba(63,93,69,0.08), transparent 60%),
      var(--bg);
    color: var(--text);
  }
  .card {
    width: 100%;
    max-width: 380px;
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: 20px;
    padding: 40px 34px 34px;
    box-shadow: 0 1px 2px rgba(58,42,30,0.05), 0 24px 48px -20px rgba(58,42,30,0.4);
    text-align: center;
  }
  .card img { height: 58px; width: auto; margin: 0 auto 18px; display: block; }
  h1 {
    font-family: 'Bodoni Moda', Georgia, serif;
    font-weight: 600;
    font-size: 1.4rem;
    margin: 0 0 4px;
    color: var(--brown-dark);
  }
  p.sub {
    margin: 0 0 28px;
    font-size: 0.82rem;
    color: var(--text-muted);
    text-transform: uppercase;
    letter-spacing: 0.08em;
    font-weight: 600;
  }
  form { text-align: left; }
  .field { margin-bottom: 16px; }
  .field label {
    display: block;
    font-size: 0.72rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    color: var(--text-muted);
    margin-bottom: 6px;
  }
  .field input {
    width: 100%;
    padding: 11px 13px;
    border: 1px solid var(--border);
    border-radius: 10px;
    font-size: 0.95rem;
    font-family: inherit;
    background: #fff;
    color: var(--text);
    transition: border-color 0.15s ease, box-shadow 0.15s ease;
  }
  .field input:focus {
    outline: none;
    border-color: var(--green);
    box-shadow: 0 0 0 3px rgba(63,93,69,0.14);
  }
  .error {
    background: color-mix(in srgb, var(--danger) 12%, var(--surface));
    color: var(--danger);
    border: 1px solid color-mix(in srgb, var(--danger) 35%, transparent);
    border-radius: 10px;
    padding: 10px 12px;
    font-size: 0.84rem;
    font-weight: 600;
    margin-bottom: 18px;
  }
  button {
    width: 100%;
    padding: 13px;
    border: none;
    border-radius: 10px;
    background: var(--green);
    color: var(--surface);
    font-family: inherit;
    font-weight: 700;
    font-size: 0.95rem;
    cursor: pointer;
    box-shadow: 0 6px 16px -6px rgba(63,93,69,0.55);
    transition: filter 0.15s ease, transform 0.05s ease;
  }
  button:hover { filter: brightness(1.06); }
  button:active { transform: translateY(1px); }
  .footnote {
    margin: 22px 0 0;
    font-size: 0.72rem;
    color: var(--text-muted);
    line-height: 1.5;
  }
</style>
</head>
<body>
  <div class="card">
    <img src="/images/logo-mark.png" alt="Moë Tea Room" />
    <h1>Espace personnel</h1>
    <p class="sub">Écran caisse &amp; cuisine</p>
    ${error ? '<div class="error">Identifiants incorrects. Veuillez réessayer.</div>' : ''}
    <form method="POST" action="/screen/login" autocomplete="on">
      <div class="field">
        <label for="u">Nom d'utilisateur</label>
        <input id="u" name="u" type="text" autocomplete="username" autofocus required />
      </div>
      <div class="field">
        <label for="p">Mot de passe</label>
        <input id="p" name="p" type="password" autocomplete="current-password" required />
      </div>
      <button type="submit">Se connecter</button>
    </form>
    <p class="footnote">Réservé au personnel du restaurant.</p>
  </div>
</body>
</html>`;
}

export const onRequest = async (context) => {
  const { request, env, next } = context;
  const url = new URL(request.url);
  const expectedUser = env.STAFF_USER;
  const expectedPass = env.STAFF_PASS;

  // Fail CLOSED: if the env vars haven't been set yet, block the screen
  // rather than silently leaving it open to anyone with the URL.
  if (!expectedUser || !expectedPass) {
    return new Response(
      'Écran non configuré : les variables STAFF_USER et STAFF_PASS ne sont pas définies dans Cloudflare Pages (Settings → Environment variables). Voir SUPABASE_SETUP.md, étape 6.',
      { status: 503 }
    );
  }

  // ---- Login form submission ----
  if (url.pathname === '/screen/login' && request.method === 'POST') {
    const form = await request.formData();
    const suppliedUser = (form.get('u') || '').toString();
    const suppliedPass = (form.get('p') || '').toString();

    if (suppliedUser === expectedUser && suppliedPass === expectedPass) {
      const expiry = Date.now() + SESSION_DAYS * 24 * 60 * 60 * 1000;
      const sig = await sign(`${expectedUser}:${expiry}`, expectedPass);
      const headers = new Headers({ Location: '/screen/' });
      headers.append(
        'Set-Cookie',
        `${COOKIE_NAME}=${expiry}.${sig}; Path=/screen; HttpOnly; Secure; SameSite=Lax; Max-Age=${SESSION_DAYS * 24 * 60 * 60}`
      );
      return new Response(null, { status: 302, headers });
    }

    return new Response(loginPageHtml({ error: true }), {
      status: 401,
      headers: { 'Content-Type': 'text/html; charset=UTF-8' },
    });
  }

  // ---- Logout ----
  if (url.pathname === '/screen/logout') {
    const headers = new Headers({ Location: '/screen/' });
    headers.append('Set-Cookie', `${COOKIE_NAME}=; Path=/screen; HttpOnly; Secure; SameSite=Lax; Max-Age=0`);
    return new Response(null, { status: 302, headers });
  }

  // ---- Check session cookie for everything else under /screen ----
  const cookies = parseCookies(request.headers.get('Cookie'));
  const rawCookie = cookies[COOKIE_NAME];
  let authed = false;

  if (rawCookie) {
    const dotIdx = rawCookie.indexOf('.');
    if (dotIdx > -1) {
      const expiry = Number(rawCookie.slice(0, dotIdx));
      const sig = rawCookie.slice(dotIdx + 1);
      if (expiry > Date.now() && sig) {
        const expectedSig = await sign(`${expectedUser}:${expiry}`, expectedPass);
        authed = expectedSig === sig;
      }
    }
  }

  if (authed) {
    return next();
  }

  return new Response(loginPageHtml(), {
    status: 401,
    headers: { 'Content-Type': 'text/html; charset=UTF-8' },
  });
};
