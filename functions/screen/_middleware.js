// Cloudflare Pages Function — runs on every request to /screen and /screen/*
// BEFORE the static file is served. Gates the in-restaurant staff screen
// behind a real login prompt (browser-native Basic Auth), so the URL alone
// is no longer enough to see or change orders/reservations/menu.
//
// The credentials live ONLY here, server-side, checked against two Cloudflare
// Pages environment variables (STAFF_USER / STAFF_PASS) — never shipped in
// any client-side JS, unlike a password check written in the page itself.
//
// Setup (one-time, in the Cloudflare dashboard — not something this repo can
// do for you): Pages project → Settings → Environment variables → add
// STAFF_USER and STAFF_PASS (Production, and Preview if you want previews
// protected too) → redeploy. See public/screen/README.md.
export const onRequest = async (context) => {
  const expectedUser = context.env.STAFF_USER;
  const expectedPass = context.env.STAFF_PASS;

  // Fail CLOSED: if the env vars haven't been set yet, block the screen
  // rather than silently leaving it open to anyone with the URL.
  if (!expectedUser || !expectedPass) {
    return new Response(
      'Écran non configuré : les variables STAFF_USER et STAFF_PASS ne sont pas définies dans Cloudflare Pages (Settings → Environment variables).',
      { status: 503 }
    );
  }

  const authHeader = context.request.headers.get('Authorization');
  if (authHeader && authHeader.startsWith('Basic ')) {
    try {
      const decoded = atob(authHeader.slice(6));
      const sep = decoded.indexOf(':');
      const suppliedUser = decoded.slice(0, sep);
      const suppliedPass = decoded.slice(sep + 1);
      if (suppliedUser === expectedUser && suppliedPass === expectedPass) {
        return context.next();
      }
    } catch {
      // Malformed header — fall through to the 401 below.
    }
  }

  return new Response('Authentification requise.', {
    status: 401,
    headers: {
      'WWW-Authenticate': 'Basic realm="Ecran cuisine Moe Tea Room", charset="UTF-8"',
    },
  });
};
