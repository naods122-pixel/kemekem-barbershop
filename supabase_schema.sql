-- ════════════════════════════════════════════════════════════════
-- KEMEKEM BARBERSHOP — SUPABASE SCHEMA (v3, syntax-corrected)
-- Run this entire file in Supabase Dashboard → SQL Editor → New Query
-- Safe to re-run: every statement is idempotent.
-- ════════════════════════════════════════════════════════════════

-- ─── 1. SERVICES TABLE ─────────────────────────────────────────────
create table if not exists services (
  id text primary key,
  name text not null,
  description text,
  price text not null,
  duration text not null,
  icon_name text default 'Scissors',
  display_order int default 0,
  created_at timestamptz default now()
);

-- ─── 2. TEAM / BARBERS TABLE ───────────────────────────────────────
create table if not exists team (
  id text primary key,
  name text not null,
  role text,
  bio text,
  img text,
  display_order int default 0,
  created_at timestamptz default now()
);

-- ─── 3. BOOKINGS TABLE ──────────────────────────────────────────────
create table if not exists bookings (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  phone text not null,
  email text not null,
  service_id text references services(id),
  service_name text,
  barber_id text,
  barber_name text,
  booking_date date not null,
  time_slot text not null,
  status text not null default 'confirmed'
    check (status in ('confirmed', 'cancelled', 'completed', 'pending')),
  user_id text,
  created_at timestamptz default now()
);

-- Real double-booking prevention at the DB level.
-- Partial unique index (not a table constraint) so a cancelled booking
-- doesn't permanently block that slot from being rebooked.
create unique index if not exists unique_active_booking_slot
  on bookings (barber_id, booking_date, time_slot)
  where status in ('confirmed', 'pending');

-- ─── 4. BLOCKED SLOTS TABLE ─────────────────────────────────────────
create table if not exists blocked_slots (
  id uuid primary key default gen_random_uuid(),
  barber_id text not null,
  blocked_date date not null,
  time_slot text not null,
  reason text default 'unavailable',
  blocked_by text,
  created_at timestamptz default now(),
  constraint unique_blocked_slot unique (barber_id, blocked_date, time_slot)
);

-- ─── 5. SHOP SETTINGS TABLE (single row config) ────────────────────
create table if not exists shop_settings (
  id int primary key default 1,
  shop_name text default 'Kemekem Barbershop',
  hero jsonb default '{}'::jsonb,
  about jsonb default '{}'::jsonb,
  contact jsonb default '{}'::jsonb,
  reviews jsonb default '[]'::jsonb,
  recent_looks jsonb default '[]'::jsonb,
  time_format text default '24hour',
  updated_at timestamptz default now(),
  constraint single_row check (id = 1)
);

-- ─── 6. ADMIN ROLE TABLE ────────────────────────────────────────────
-- Links a Supabase Auth user (by uid) to admin privileges.
-- RLS policies check this table instead of trusting the client.
create table if not exists admin_users (
  user_id uuid primary key references auth.users(id) on delete cascade,
  email text not null,
  created_at timestamptz default now()
);

-- ════════════════════════════════════════════════════════════════
-- ROW LEVEL SECURITY
-- ════════════════════════════════════════════════════════════════

alter table services enable row level security;
alter table team enable row level security;
alter table bookings enable row level security;
alter table blocked_slots enable row level security;
alter table shop_settings enable row level security;
alter table admin_users enable row level security;

-- Helper function: is the CURRENT authenticated user an admin?
create or replace function is_admin()
returns boolean
language sql
security definer
stable
as $$
  select exists (
    select 1 from admin_users where user_id = auth.uid()
  );
$$;

-- ── POLICIES ──
-- create policy has no "IF NOT EXISTS" in Postgres, so every policy is
-- dropped first to make this whole script safely re-runnable.

drop policy if exists "Public can view services" on services;
create policy "Public can view services" on services for select using (true);

drop policy if exists "Public can view team" on team;
create policy "Public can view team" on team for select using (true);

drop policy if exists "Public can view shop settings" on shop_settings;
create policy "Public can view shop settings" on shop_settings for select using (true);

drop policy if exists "Public can view blocked slots" on blocked_slots;
create policy "Public can view blocked slots" on blocked_slots for select using (true);

drop policy if exists "Public can view bookings" on bookings;
create policy "Public can view bookings" on bookings for select using (true);

drop policy if exists "Public can create bookings" on bookings;
create policy "Public can create bookings" on bookings for insert with check (true);

drop policy if exists "Admins can update bookings" on bookings;
create policy "Admins can update bookings" on bookings for update using (is_admin());

drop policy if exists "Admins can delete bookings" on bookings;
create policy "Admins can delete bookings" on bookings for delete using (is_admin());

drop policy if exists "Admins can manage services" on services;
create policy "Admins can manage services" on services for all using (is_admin()) with check (is_admin());

drop policy if exists "Admins can manage team" on team;
create policy "Admins can manage team" on team for all using (is_admin()) with check (is_admin());

drop policy if exists "Admins can manage blocked slots" on blocked_slots;
create policy "Admins can manage blocked slots" on blocked_slots for all using (is_admin()) with check (is_admin());

drop policy if exists "Admins can update settings" on shop_settings;
create policy "Admins can update settings" on shop_settings for update using (is_admin()) with check (is_admin());

drop policy if exists "Admins can view own admin row" on admin_users;
create policy "Admins can view own admin row" on admin_users for select using (auth.uid() = user_id);

-- ════════════════════════════════════════════════════════════════
-- SEED DATA (safe to re-run via ON CONFLICT)
-- ════════════════════════════════════════════════════════════════

insert into shop_settings (id, shop_name, time_format)
values (1, 'Kemekem Barbershop', '24hour')
on conflict (id) do nothing;

insert into services (id, name, description, price, duration, icon_name, display_order) values
  ('s1', 'Classic Haircut', 'Precision scissor and clipper cut tailored to your style.', '250 ETB', '30 min', 'Scissors', 1),
  ('s2', 'Beard Trim & Shape', 'Sharp lines and a clean beard shape.', '150 ETB', '20 min', 'Award', 2),
  ('s3', 'Hot Towel Shave', 'Traditional straight-razor shave with hot towel finish.', '200 ETB', '30 min', 'Droplet', 3)
on conflict (id) do nothing;

insert into team (id, name, role, bio, img, display_order) values
  ('b1', 'Abel Tesfaye', 'Master Barber', '10+ years of precision cuts.', null, 1),
  ('b2', 'Henok Girma', 'Senior Stylist', 'Specialist in modern fades.', null, 2)
on conflict (id) do nothing;

-- ════════════════════════════════════════════════════════════════
-- MAKE YOURSELF ADMIN — run this AFTER creating your owner account
-- in Supabase Dashboard → Authentication → Users
-- ════════════════════════════════════════════════════════════════
-- insert into admin_users (user_id, email)
-- select id, email from auth.users where email = 'YOUR_OWNER_EMAIL_HERE'
-- on conflict (user_id) do nothing;
