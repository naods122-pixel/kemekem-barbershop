-- ============================================================================
-- VERIFY: 03_migration_customer_ownership.sql
--
-- Entirely read-only — every statement below is a SELECT. Nothing here
-- writes, alters, or deletes anything, and nothing in this file should be
-- run until 03_migration_customer_ownership.sql has actually been applied
-- (except Part 0, which must run BEFORE, as a baseline).
-- ============================================================================


-- ============================================================================
-- PART 0 — RUN THIS BEFORE THE MIGRATION, AND SAVE THE OUTPUT
-- Captures the exact pre-migration state so Part 2 (below) can prove
-- nothing about existing data changed, rather than just asserting it did.
-- ============================================================================

select
  count(*) as total_rows,
  count(*) filter (where user_id is null) as null_user_id,
  count(*) filter (where user_id is not null) as non_null_user_id,
  md5(string_agg(coalesce(user_id, '<null>'), ',' order by id)) as user_id_checksum
from public.bookings;
-- Expected right now (confirmed via live introspection): total_rows = 38,
-- null_user_id = 36, non_null_user_id = 2. Save the checksum value — Part 2
-- compares against it.


-- ============================================================================
-- PART 1 — STRUCTURAL CHECKS (run any time after the migration)
-- ============================================================================

-- 1) customer_id exists and is uuid.
select column_name, data_type, is_nullable
from information_schema.columns
where table_schema = 'public' and table_name = 'bookings' and column_name = 'customer_id';
-- expect: one row, data_type = uuid, is_nullable = YES

-- 2) customer_id has the intended foreign key to auth.users.
select tc.constraint_name, kcu.column_name, ccu.table_schema as foreign_table_schema,
       ccu.table_name as foreign_table_name, ccu.column_name as foreign_column_name
from information_schema.table_constraints tc
join information_schema.key_column_usage kcu on tc.constraint_name = kcu.constraint_name
join information_schema.constraint_column_usage ccu on tc.constraint_name = ccu.constraint_name
where tc.table_schema = 'public' and tc.table_name = 'bookings'
  and tc.constraint_type = 'FOREIGN KEY' and kcu.column_name = 'customer_id';
-- expect: one row referencing auth.users.id

-- 3) RLS is enabled on bookings.
select relrowsecurity from pg_class
where relname = 'bookings' and relnamespace = 'public'::regnamespace;
-- expect: true

-- 4) The 4 intended policies exist, correctly scoped.
select policyname, cmd, roles, qual, with_check
from pg_policies
where schemaname = 'public' and tablename = 'bookings'
order by policyname;
-- expect exactly:
--   "admins full access to bookings"        | ALL    | {authenticated} | is_admin()
--   "customers can create own bookings"     | INSERT | {authenticated} | (with_check: customer_id = auth.uid())
--   "customers can read own bookings"       | SELECT | {authenticated} | customer_id = auth.uid()
--   "customers can update own bookings"     | UPDATE | {authenticated} | customer_id = auth.uid()

-- 5) The 5 old unrestricted policies are gone — this query should return
--    ZERO rows.
select policyname from pg_policies
where schemaname = 'public' and tablename = 'bookings'
  and policyname in (
    'Public can view bookings',
    'Public can create bookings',
    'Allow public booking cancellation',
    'Admins can update bookings',
    'Admins can delete bookings'
  );
-- expect: 0 rows

-- 6) booking_availability exists.
select table_name, table_type from information_schema.tables
where table_schema = 'public' and table_name = 'booking_availability';
-- expect: one row, table_type = VIEW

-- 7) booking_availability exposes only the 4 intended non-PII columns.
select column_name from information_schema.columns
where table_schema = 'public' and table_name = 'booking_availability'
order by ordinal_position;
-- expect exactly: id, barber_id, booking_date, time_slot — and specifically
-- NOT name/phone/email/user_id/customer_id/any other column

-- 8) user_id is still text, unchanged.
select data_type from information_schema.columns
where table_schema = 'public' and table_name = 'bookings' and column_name = 'user_id';
-- expect: text


-- ============================================================================
-- PART 2 — DATA-INTEGRITY CHECKS (compare against Part 0's saved output)
-- ============================================================================

-- 9) Row count unchanged.
select count(*) as total_rows_now from public.bookings;
-- expect: matches Part 0's total_rows exactly (38, unless legitimate new
-- bookings came in between running Part 0 and the migration — in which
-- case it should be >= 38, never less)

-- 10) user_id values unchanged — recompute the same checksum from Part 0
--     and compare by eye. An identical checksum proves every existing
--     user_id value, for every existing row, is byte-for-byte the same as
--     before the migration ran.
select
  count(*) filter (where user_id is null) as null_user_id,
  count(*) filter (where user_id is not null) as non_null_user_id,
  md5(string_agg(coalesce(user_id, '<null>'), ',' order by id)) as user_id_checksum
from public.bookings;
-- expect: null_user_id / non_null_user_id match Part 0 exactly, and the
-- checksum is IDENTICAL to Part 0's checksum

-- 11) No destructive operation occurred — implied by 9 and 10 together
--     (row count didn't shrink, and the user_id checksum is unchanged),
--     plus this explicit re-check that user_id itself wasn't touched at
--     the schema level (already covered by check 8, repeated here for a
--     single-purpose confirmation):
select
  (select data_type from information_schema.columns where table_schema='public' and table_name='bookings' and column_name='user_id') as user_id_type,
  (select count(*) from public.bookings) as row_count;
-- expect: user_id_type = text, row_count >= 38 (never less than the
-- pre-migration count)
