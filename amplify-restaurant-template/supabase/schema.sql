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
  customer_phone text not null,
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
-- Realtime — the staff screen subscribes to live changes on both tables
-- (new order comes in → appears instantly, no refresh). Without this, the
-- staff screen would only ever see orders on its own manual refresh.
-- ----------------------------------------------------------------------------
alter publication supabase_realtime add table public.orders;
alter publication supabase_realtime add table public.reservations;
