# Supabase setup — Moë Tea Room

This site's cart/checkout and reservation form need a Supabase project to sync
orders to the in-restaurant staff screen. Do this once.

## 1. Create the project

1. Go to https://supabase.new and create a free project (any name, e.g.
   "moe-tea-room"; pick a region close to Morocco, e.g. `eu-west-1` — Paris/
   Frankfurt).
2. Wait for it to finish provisioning (~2 minutes).

## 2. Run the schema

1. In the Supabase dashboard, open **SQL Editor → New query**.
2. Paste the entire contents of `supabase/schema.sql` (in this project) and
   click **Run**.
3. This creates two tables (`orders`, `reservations`) with the row-level-
   security policies the site and the staff screen both rely on, and turns
   on realtime for both.

## 3. Get your credentials

1. Go to **Project Settings → API**.
2. Copy the **Project URL** (looks like `https://xxxxxxxx.supabase.co`).
3. Copy the **anon / publishable** key (NOT the `service_role` key — that
   one must never be used client-side).

## 4. Wire it into the site

Open `src/config/site.config.ts`, find the `ordering` block, and fill in:

```ts
ordering: {
  supabaseUrl: 'https://xxxxxxxx.supabase.co',
  supabaseAnonKey: 'sb_publishable_xxxxxxxxxxxxxxxxxxxxxxxx',
},
```

Rebuild and redeploy the site. Checkout and the reservation form now write
to your Supabase project.

## 5. Wire it into the staff screen

The staff screen now lives AT `moetearoom.pages.dev/screen` — it's part of
this same Astro site's build (`public/screen/index.html`), not a separate
deploy. Fill in the same Project URL and anon key from step 3 at the top of
that file (and, for reference, in the archived copy at
`staff-screen/index.html` too, so they don't drift apart).

The staff screen has three tabs: live orders, live reservations (the site's
reservation form writes straight to the `reservations` table this schema
created — no extra wiring needed beyond this shared project), and a menu
editor. That editor lets staff mark a dish sold out or change its price
without a code deploy, AND add a brand new dish straight from the screen
(writes to the `menu_items` table `schema.sql` created) — the Menu page
picks up all of this automatically on next page load, no rebuild/redeploy
of the main site needed.

## 6. Set up the staff screen's login

`/screen` is protected by a real login prompt, enforced server-side by a
Cloudflare Pages Function (`functions/screen/_middleware.js` in this repo —
nothing to edit there). You only need to set two environment variables,
once, in the Cloudflare dashboard:

1. Open the Cloudflare Pages project for this site → **Settings →
   Environment variables**.
2. Add `STAFF_USER` (e.g. `personnel`) and `STAFF_PASS` (a strong password
   of your choice) for **Production** (and Preview too, if you want preview
   deploys protected as well).
3. Redeploy once so the Function picks up the new variables.

Until both variables are set, `/screen` deliberately shows an error instead
of loading — that's the fail-safe working as intended, not a bug.

## Notes

- The anon/publishable key is safe to ship in client-side code by design —
  it can only do what the RLS policies in `schema.sql` allow (insert orders/
  reservations, and read+update them for the staff screen). Never use the
  `service_role` key anywhere in this project.
- Until this is set up, checkout still works — the WhatsApp message still
  sends — only the live staff-screen sync won't happen.
