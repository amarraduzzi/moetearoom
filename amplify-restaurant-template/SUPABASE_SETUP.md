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

The staff screen is a separate deploy (its own zip). Send me the Project URL
and anon key from step 3 and I'll patch its config and send you an updated
build — or see that project's own README if you're doing it yourself.

## Notes

- The anon/publishable key is safe to ship in client-side code by design —
  it can only do what the RLS policies in `schema.sql` allow (insert orders/
  reservations, and read+update them for the staff screen). Never use the
  `service_role` key anywhere in this project.
- Until this is set up, checkout still works — the WhatsApp message still
  sends — only the live staff-screen sync won't happen.
