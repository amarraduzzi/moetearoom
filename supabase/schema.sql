-- ============================================================================
-- Moë Tea Room — Supabase schema
--
-- Run this ONCE in a NEW Supabase project's SQL editor (Project → SQL
-- Editor → New query → paste this whole file → Run). It creates the two
-- tables the site's cart/checkout and reservation form write to, and the
-- exact row-level-security policies that let the site's public "anon /
-- publishable" key insert orders/reservations from the browser, and let
-- the in-restaurant staff-screen app (separate deploy) read + update them
-- live — without exposing anything else in the project.
--
-- After running this: Project Settings → API → copy the "Project URL" and
-- the "anon / publishable" key into src/config/site.config.ts's
-- `ordering.supabaseUrl` / `ordering.supabaseAnonKey`, and into the staff
-- screen's config (see the staff-screen project's own README). See
-- SUPABASE_SETUP.md at the root of this project for the full walkthrough.
-- ============================================================================

create extension if not exists "pgcrypto";

-- ----------------------------------------------------------------------------
-- orders — written by the site's cart/checkout (CartWidget.astro), read and
-- updated live by the staff screen.
-- ----------------------------------------------------------------------------
create table if not exists public.orders (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  order_ref text,
  customer_name text not null,
  -- Nullable: the checkout form only asks for a phone number for takeaway/
  -- delivery orders — dine-in customers are physically at the table, so
  -- staff don't need a callback number for those (see CartWidget.astro's
  -- applyMode()).
  customer_phone text,
  -- 'dinein' | 'takeaway' | 'delivery'
  order_type text not null default 'dinein',
  -- table number (dine-in) or delivery address (delivery) — one free-text
  -- field, same shape the staff screen already expects.
  address_or_table text,
  -- [{ name, quantity, price }, ...]
  items jsonb not null default '[]'::jsonb,
  total numeric(10, 2) not null default 0,
  notes text,
  -- 'pending' | 'preparing' | 'ready' | 'completed' | 'cancelled'
  status text not null default 'pending'
);

alter table public.orders enable row level security;

-- Anyone with the publishable anon key can create an order (a customer
-- checking out — there's no login flow on the marketing site).
create policy "orders_insert_anon" on public.orders
  for insert to anon
  with check (true);

-- The staff screen reads the live order list with the same anon key (no
-- separate staff login in this v1 — see the staff-screen project's own
-- README for that trade-off).
create policy "orders_select_anon" on public.orders
  for select to anon
  using (true);

-- The staff screen updates order status (pending → preparing → ready → ...).
create policy "orders_update_anon" on public.orders
  for update to anon
  using (true)
  with check (true);

-- ----------------------------------------------------------------------------
-- reservations — written by the site's reservation form
-- (ReservationContent.astro), read and updated live by the staff screen.
-- ----------------------------------------------------------------------------
create table if not exists public.reservations (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  name text not null,
  phone text not null,
  party_size integer not null,
  reservation_date date not null,
  reservation_time text not null,
  notes text,
  -- 'pending' | 'confirmed' | 'cancelled'
  status text not null default 'pending'
);

alter table public.reservations enable row level security;

create policy "reservations_insert_anon" on public.reservations
  for insert to anon
  with check (true);

create policy "reservations_select_anon" on public.reservations
  for select to anon
  using (true);

create policy "reservations_update_anon" on public.reservations
  for update to anon
  using (true)
  with check (true);

-- ----------------------------------------------------------------------------
-- menu_items — lets the in-restaurant staff screen turn dishes on/off and
-- edit prices WITHOUT a code deploy, AND lets it add brand new dishes that
-- don't exist in the site's code at all. `item_key` is the join key the
-- site's Menu page uses to look up a row: for a dish that already exists in
-- src/content/menu-highlights.ts, item_key is that dish's exact name (e.g.
-- 'Le Cheeseburger Moë'); for a dish added FROM the staff screen, item_key
-- is a slug the staff screen generates itself (see staff-screen/index.html)
-- since there's no static entry to match against.
--
-- Two different things share this one table on purpose, both driven by the
-- same "change without a code deploy" need:
--   1. OVERRIDE of an existing static dish — price/available, AND (since
--      Sept 2026) name/description too, so staff can rename or
--      re-describe a dish that already ships in menu-highlights.ts without
--      a code deploy. item_key never changes — it's still the join key —
--      only what's displayed for it does. The site tells this case apart
--      from case 2 below by whether item_key matches a real static dish
--      (read from the page's own DOM at runtime — see MenuContent.astro's
--      menu-items-sync script), NOT by whether name is set, since an
--      override row can carry a name now too.
--   2. A wholly NEW dish, added from the staff screen — name/description/
--      category/price are all set, and the site's Menu page renders an
--      extra card for it (see MenuContent.astro's menu-items-sync script).
--
-- Every dish with no row here still shows at its normal name/description/
-- price/available on the site. This keeps the staff screen's editor simple
-- (edit only what changed, or add only what's new) instead of requiring a
-- full duplicate menu to be seeded and kept in sync by hand.
create table if not exists public.menu_items (
  id uuid primary key default gen_random_uuid(),
  updated_at timestamptz not null default now(),
  item_key text not null unique,
  -- Set for BOTH cases now (Sept 2026) — for an override row (case 1) this
  -- is the dish's current displayed name, which starts out equal to
  -- item_key and only differs once staff renames it; for a new dish
  -- (case 2) it's that dish's only name.
  name text,
  description text,
  -- Informational for existing-dish overrides (not used by the site's
  -- lookup there); the actual section heading a new dish is grouped under
  -- for case 2 — matched by exact text against menu-highlights.ts's
  -- category labels where possible, otherwise shown in its own section.
  category text,
  -- Overrides. Null price means "use the site's own price for this item"
  -- for an existing dish, not "free" — the staff screen should always send
  -- a real number when it writes a row, but null is handled safely either
  -- way.
  price numeric(10, 2),
  available boolean not null default true,
  -- Which prep station this dish routes to on the staff screen — 'bar' or
  -- 'cuisine'. Only meaningful for a NEW dish (case 2); an existing static
  -- dish already has its station from MenuContent.astro's own
  -- STATION_BY_CATEGORY map and doesn't need an override row for it.
  station text,
  -- Unused since Sept 2026 — dish photos were removed from the Menu page
  -- entirely (Amar: "ik wil helemaal geen foto in het menu hebben"), so
  -- nothing writes or reads this column anymore. Left in place rather than
  -- dropped so no migration is needed either way; safe to ignore.
  image_url text
);

alter table public.menu_items enable row level security;

-- The site's Menu page reads overrides with the anon key (no login flow on
-- the marketing site, same trade-off as orders/reservations above).
create policy "menu_items_select_anon" on public.menu_items
  for select to anon
  using (true);

-- The staff screen inserts/updates overrides with the same anon key — see
-- the standing v1 trade-off note on orders_select_anon above (no separate
-- staff login yet).
create policy "menu_items_insert_anon" on public.menu_items
  for insert to anon
  with check (true);

create policy "menu_items_update_anon" on public.menu_items
  for update to anon
  using (true)
  with check (true);

-- ----------------------------------------------------------------------------
-- Realtime — the staff screen subscribes to live changes on all three
-- tables (new order comes in → appears instantly, no refresh). Without
-- this, the staff screen would only ever see changes on its own manual
-- refresh.
-- ----------------------------------------------------------------------------
alter publication supabase_realtime add table public.orders;
alter publication supabase_realtime add table public.reservations;
alter publication supabase_realtime add table public.menu_items;

-- ----------------------------------------------------------------------------
-- MIGRATIONS — one-off statements for a project that already ran an older
-- version of this file. Safe to run again if already applied (each guards
-- itself). New projects don't need these — the create table above already
-- has the final shape.
-- ----------------------------------------------------------------------------

-- Sept 2026: the checkout form stopped requiring a phone number for
-- dine-in orders (customer is physically at the table) — this column was
-- originally "not null". Run this once on an existing project:
alter table public.orders alter column customer_phone drop not null;

-- Sept 2026: bar/cuisine routing + dish photos. Run this once on an
-- existing project (both statements are safe to re-run):
alter table public.menu_items add column if not exists station text;
alter table public.menu_items add column if not exists image_url text;

-- ----------------------------------------------------------------------------
-- Storage — 'menu-photos' bucket for dish photos uploaded from the staff
-- screen (new dishes and existing-dish overrides). Public read (photos are
-- shown on the public site), anon insert/update (same v1 trade-off as the
-- tables above — no staff login gate on the Storage API itself, only on the
-- /screen route serving the upload UI). Run this once, new project or
-- existing — it's idempotent.
-- ----------------------------------------------------------------------------
insert into storage.buckets (id, name, public)
values ('menu-photos', 'menu-photos', true)
on conflict (id) do nothing;

create policy "menu_photos_read_public" on storage.objects
  for select to public
  using (bucket_id = 'menu-photos');

create policy "menu_photos_insert_anon" on storage.objects
  for insert to anon
  with check (bucket_id = 'menu-photos');

create policy "menu_photos_update_anon" on storage.objects
  for update to anon
  using (bucket_id = 'menu-photos');
