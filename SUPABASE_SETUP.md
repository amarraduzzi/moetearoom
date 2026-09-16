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

The staff screen lives in this repo under `staff-screen/` (a separate static
deploy — its own Cloudflare Pages project, not part of this Astro site's
build). Open `staff-screen/index.html`, fill in the same Project URL and
anon key from step 3 at the top of the file, and deploy that folder on its
own — see `staff-screen/README.md`.

The staff screen has three tabs: live orders, live reservations (the site's
reservation form writes straight to the `reservations` table this schema
created — no extra wiring needed beyond this shared project), and a menu
editor. That editor lets staff mark a dish sold out or change its price
without a code deploy, AND add a brand new dish straight from the screen
(writes to the `menu_items` table `schema.sql` created) — the Menu page
picks up all of this automatically on next page load, no rebuild/redeploy
of the main site needed.

## Notes

- The anon/publishable key is safe to ship in client-side code by design —
  it can only do what the RLS policies in `schema.sql` allow (insert orders/
  reservations, and read+update them for the staff screen). Never use the
  `service_role` key anywhere in this project.
- Until this is set up, checkout still works — the WhatsApp message still
  sends — only the live staff-screen sync won't happen.
