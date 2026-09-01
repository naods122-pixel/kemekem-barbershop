-- ============================================================================
-- PRE-FLIGHT CHECK — run this FIRST, in the Supabase SQL editor, and read
-- the output before running the migration.
--
-- I don't have live access to your Supabase project (no credentials, and
-- this sandbox has no network path to supabase.co) — everything in the
-- migration was designed and tested against a faithful local replica of
-- Supabase's Postgres/RLS behavior, not your actual database. This script
-- checks the few assumptions the migration depends on, so you can catch a
-- mismatch before running anything.
-- ============================================================================

-- 1) Confirm bookings.user_id exists and is a uuid (the migration assumes
--    this — if it's missing or a different type, stop and tell me).
select column_name, data_type, is_nullable
from information_schema.columns
where table_schema = 'public' and table_name = 'bookings'
order by ordinal_position;

-- 2) Whatever RLS policies currently exist on bookings, by name — the
--    migration drops ALL of these (whatever they're called) and replaces
--    them. Take a look before running it.
select policyname, cmd, roles, qual, with_check
from pg_policies
where schemaname = 'public' and tablename = 'bookings';

-- 3) Is RLS currently enabled on bookings at all?
select relrowsecurity, relforcerowsecurity
from pg_class
where relname = 'bookings' and relnamespace = 'public'::regnamespace;

-- 4) Confirm admin_users has the shape checkIsAdmin() expects (this
--    migration does not touch admin_users, but the new admin policy on
--    bookings depends on this table's existing shape).
select column_name, data_type
from information_schema.columns
where table_schema = 'public' and table_name = 'admin_users';

-- 5) Does anything already named booking_availability exist? (the
--    migration will create-or-replace a view with this name)
select table_name, table_type
from information_schema.tables
where table_schema = 'public' and table_name = 'booking_availability';
