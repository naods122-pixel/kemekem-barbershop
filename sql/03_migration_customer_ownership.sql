-- ============================================================================
-- Migration: customer ownership via customer_id (bookings.user_id stays as-is)
--
-- WHAT THIS DOES
--   1. Adds a new, nullable column `customer_id uuid` to public.bookings,
--      with a foreign key to auth.users(id), plus an index. This is the
--      ownership key going forward — NOT the existing `user_id` (text)
--      column, which is left completely untouched (not read, not written,
--      not altered, not dropped) by this migration.
--   2. Confirms RLS is enabled on public.bookings (idempotent — it is
--      already enabled in production; this is a safety no-op, not a
--      state change).
--   3. Removes exactly the 5 specific policies currently on
--      public.bookings, by their exact confirmed names — not a dynamic
--      "drop everything" pass, since these 5 are precisely known:
--        - "Public can view bookings"           (SELECT, public, true)
--        - "Public can create bookings"          (INSERT, public, true)
--        - "Allow public booking cancellation"   (UPDATE, anon, true/true)
--        - "Admins can update bookings"           (UPDATE, public, is_admin())
--        - "Admins can delete bookings"           (DELETE, public, is_admin())
--      The first three are the actual vulnerability (unconditional public
--      read/write). The last two are safe in principle but are being
--      consolidated into one broader admin policy below so admin access is
--      defined in one place.
--   4. Creates exactly 4 new policies (see below), all scoped to
--      `authenticated` — never `anon` or `public` — and reusing the
--      existing `is_admin()` function for admin access rather than
--      duplicating its logic.
--   5. Creates `public.booking_availability`, a view exposing only
--      (id, barber_id, booking_date, time_slot) for confirmed bookings —
--      no name, phone, email, user_id, or customer_id. Uses `time_slot`
--      (confirmed live/populated) — not `booking_time` (confirmed legacy,
--      0 populated rows) — and does not reference the legacy `service`
--      column.
--
-- WHAT THIS DELIBERATELY DOES NOT DO
--   - Does not touch `user_id` in any way — no read, no write, no type
--     change, no rename, no drop.
--   - Does not touch shop_settings, appointments, services, team,
--     products, blocked_slots, or any Auth/project setting.
--   - Does not use DROP TABLE, DELETE, TRUNCATE, or any row-data-changing
--     statement — this migration only changes schema and access rules,
--     never row contents. Existing row count and every existing column's
--     data are unaffected.
--   - Does not grant `anon` or unauthenticated `public` any access to
--     bookings — every new policy targets `authenticated` only.
--
-- IDEMPOTENCY
--   Every step here is safe to run more than once: `ADD COLUMN IF NOT
--   EXISTS`, a guarded FK add, `CREATE INDEX IF NOT EXISTS`, `ENABLE ROW
--   LEVEL SECURITY` (safe if already on), `DROP POLICY IF EXISTS` before
--   every CREATE POLICY (covering both the 5 old policies and re-runs of
--   the 4 new ones), and `CREATE OR REPLACE VIEW`.
--
-- ASSUMPTIONS BAKED IN (confirmed via live introspection, not guessed)
--   - public.bookings has 38 rows: 36 with user_id NULL, 2 with a
--     well-formed UUID string that matches a real auth.users row.
--   - public.admin_users.user_id is uuid; public.admin_users currently has
--     0 rows (nobody currently passes is_admin() — a pre-existing,
--     separate condition this migration does not change or need to fix).
--   - public.is_admin() already exists as SECURITY DEFINER SQL checking
--     `admin_users where user_id = auth.uid()` — reused here, not
--     reimplemented.
--   - time_slot is populated on all 38 rows; booking_time and the plain
--     `service` column are populated on none of them.
-- ============================================================================

begin;

-- 1) New ownership column — additive, nullable, zero effect on user_id.
alter table public.bookings add column if not exists customer_id uuid;

do $$
begin
  alter table public.bookings
    add constraint bookings_customer_id_fkey
    foreign key (customer_id) references auth.users(id);
exception
  when duplicate_object then null;
end $$;

create index if not exists bookings_customer_id_idx on public.bookings (customer_id);

-- 2) Confirm RLS is on (already is — no-op in production, included for
--    completeness/idempotency in case this ever runs against a database
--    where it isn't).
alter table public.bookings enable row level security;

-- 3) Remove exactly the 5 known current policies, by exact name.
drop policy if exists "Public can view bookings" on public.bookings;
drop policy if exists "Public can create bookings" on public.bookings;
drop policy if exists "Allow public booking cancellation" on public.bookings;
drop policy if exists "Admins can update bookings" on public.bookings;
drop policy if exists "Admins can delete bookings" on public.bookings;

-- 4) Create the 4 new policies (DROP IF EXISTS first so this whole
--    migration can be safely re-run).

drop policy if exists "admins full access to bookings" on public.bookings;
create policy "admins full access to bookings"
on public.bookings
for all
to authenticated
using (is_admin())
with check (is_admin());

drop policy if exists "customers can read own bookings" on public.bookings;
create policy "customers can read own bookings"
on public.bookings
for select
to authenticated
using (customer_id = auth.uid());

drop policy if exists "customers can create own bookings" on public.bookings;
create policy "customers can create own bookings"
on public.bookings
for insert
to authenticated
with check (customer_id = auth.uid());

drop policy if exists "customers can update own bookings" on public.bookings;
create policy "customers can update own bookings"
on public.bookings
for update
to authenticated
using (customer_id = auth.uid())
with check (customer_id = auth.uid());

-- 5) Public, non-identifying availability view. Uses time_slot (live) —
--    not booking_time (legacy, unpopulated) — and does not reference the
--    legacy `service` column. No name/phone/email/user_id/customer_id.
create or replace view public.booking_availability as
select id, barber_id, booking_date, time_slot
from public.bookings
where status = 'confirmed';

grant select on public.booking_availability to anon, authenticated;

commit;
