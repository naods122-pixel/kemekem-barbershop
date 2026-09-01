-- ============================================================================
-- Migration: secure customer booking ownership
--
-- WHAT THIS DOES
--   - Confirms `bookings.user_id` references auth.users (adds the FK if it's
--     missing) and indexes it. No new column: `user_id` already existed and
--     was already being written by handleBookingSubmit (`user_id: user?.id
--     || null`) — it just never got a real, verifiable value for ordinary
--     customers, because customers were never actually authenticated. This
--     migration doesn't change what the column means, only what's allowed
--     to write to it and read from it.
--   - Enables Row Level Security on `bookings` (safe to run even if already
--     enabled).
--   - Drops every existing policy on `bookings`, whatever it's currently
--     named (I could not inspect your live policies from the client code —
--     see the accompanying report), and replaces them with an explicit,
--     reviewed set below. RLS stays enabled throughout this migration, so
--     there is never a moment where the table has zero policies and is
--     therefore open — default-deny applies until the new policies commit.
--
-- WHAT THIS DOES NOT DO
--   - Does not touch services / team / products / shop_settings / blocked_slots.
--   - Does not delete or modify any existing row data.
--   - Does not change admin_users or how admin status is determined.
--
-- PREREQUISITE (must be done in the Supabase dashboard, not SQL):
--   Authentication → Providers → enable "Allow anonymous sign-ins".
--   Without this, `supabase.auth.signInAnonymously()` (added to App.jsx as
--   part of this change) will fail for every guest, and — because the new
--   policies below require a real authenticated `auth.uid()` — booking will
--   stop working entirely for anyone who isn't the admin. This is a hard
--   requirement, not a nice-to-have.
--
-- KNOWN, UNAVOIDABLE SIDE EFFECT
--   Bookings created before this migration (user_id IS NULL) have no
--   verifiable owner and will no longer appear in "My Appointments" for the
--   customer who made them — `user_id = auth.uid()` can never match NULL.
--   They remain fully visible and manageable from the admin dashboard
--   (admins bypass the ownership check below), and no row is deleted or
--   altered. See the report for why this can't be avoided and options for
--   handling it.
-- ============================================================================

begin;

-- Add the FK constraint if user_id doesn't already have one (safe if it does).
do $$
begin
  alter table public.bookings
    add constraint bookings_user_id_fkey
    foreign key (user_id) references auth.users(id);
exception
  when duplicate_object then null;
end $$;

create index if not exists bookings_user_id_idx on public.bookings (user_id);

alter table public.bookings enable row level security;

-- Drop every existing policy on this table by name, whatever it's called,
-- so the end state below is the complete, known state — not "the new
-- policies plus whatever was already there."
do $$
declare pol record;
begin
  for pol in
    select policyname from pg_policies
    where schemaname = 'public' and tablename = 'bookings'
  loop
    execute format('drop policy if exists %I on public.bookings', pol.policyname);
  end loop;
end $$;

-- Admins: full access, matching the existing admin dashboard's needs
-- (read all bookings, change status, etc.) — same admin_users membership
-- check the app already uses in checkIsAdmin().
create policy "admins full access to bookings"
on public.bookings
for all
to authenticated
using (exists (select 1 from public.admin_users a where a.user_id = auth.uid()))
with check (exists (select 1 from public.admin_users a where a.user_id = auth.uid()));

-- Customers: can read only bookings they own.
create policy "customers can read own bookings"
on public.bookings
for select
to authenticated
using (user_id = auth.uid());

-- Customers: can create a booking, but only ever attributed to themselves —
-- the payload's user_id must equal their own auth.uid(), so a client cannot
-- claim another customer's identity by sending a different id in the request.
create policy "customers can create own bookings"
on public.bookings
for insert
to authenticated
with check (user_id = auth.uid());

-- Customers: can update (cancel / reschedule) only bookings they own, and
-- cannot use an update to reassign a booking to someone else.
create policy "customers can update own bookings"
on public.bookings
for update
to authenticated
using (user_id = auth.uid())
with check (user_id = auth.uid());

-- ── Public, non-identifying availability view ─────────────────────────────
-- The slot-availability grid (which times are already taken for barber X on
-- date Y) needs to see EVERY confirmed booking, not just the current
-- customer's own — otherwise every other customer's taken slot would
-- incorrectly show as free. The four policies above intentionally do NOT
-- allow that (that's the whole point of this migration), so this view
-- exposes only the three non-identifying columns actually needed for
-- availability — no name, phone, email, or any other customer detail.
-- Views run with their owner's privileges by default (not the querying
-- user's), so this correctly bypasses the ownership-scoped policies above
-- for just these three columns, while every other column on `bookings`
-- stays fully protected.
create or replace view public.booking_availability as
select id, barber_id, booking_date, time_slot
from public.bookings
where status = 'confirmed';

grant select on public.booking_availability to anon, authenticated;

commit;
