-- ============================================================================
-- VERIFY STEP 2 IS CORRECTLY INSTALLED — run this in the Supabase SQL
-- editor AFTER applying 01_migration_secure_booking_ownership.sql.
--
-- I have no network access to your actual Supabase project from this
-- sandbox (no credentials, and this environment can't reach supabase.co),
-- so this file was written to be run BY YOU, not by me — I have not run it
-- against anything. Part 1 is pure metadata inspection (100% read-only,
-- no data touched, safe to run any time). Part 2 exercises the policies by
-- impersonating different users inside transactions that always ROLLBACK,
-- so no real data is ever changed — but it does briefly assume different
-- roles for the duration of each transaction. Read each block before
-- running it, same as the migration.
-- ============================================================================


-- ============================================================================
-- PART 1 — STRUCTURAL CHECKS (read-only; confirms the pieces exist)
-- ============================================================================

-- 1a) RLS must be enabled on bookings.
select
  relname as table_name,
  relrowsecurity as rls_enabled
from pg_class
where relname = 'bookings' and relnamespace = 'public'::regnamespace;
-- expect: rls_enabled = true

-- 1b) The four policies from Step 2 must exist, with the expected command
--     and role scoping. (Exact policy text can shift slightly across
--     Postgres/Supabase versions in how it's displayed — the important
--     thing is that all four names below appear, each with the roles/cmd
--     shown.)
select policyname, cmd, roles, qual, with_check
from pg_policies
where schemaname = 'public' and tablename = 'bookings'
order by policyname;
-- expect exactly these 4 rows:
--   "admins full access to bookings"        | ALL    | {authenticated}
--   "customers can create own bookings"     | INSERT | {authenticated}
--   "customers can read own bookings"       | SELECT | {authenticated}
--   "customers can update own bookings"     | UPDATE | {authenticated}

-- 1c) bookings.user_id must exist, be a uuid, and reference auth.users.
select
  c.column_name,
  c.data_type,
  (
    select count(*) from information_schema.table_constraints tc
    join information_schema.key_column_usage kcu
      on tc.constraint_name = kcu.constraint_name
    where tc.table_schema = 'public' and tc.table_name = 'bookings'
      and tc.constraint_type = 'FOREIGN KEY' and kcu.column_name = 'user_id'
  ) as has_fk_to_auth_users
from information_schema.columns c
where c.table_schema = 'public' and c.table_name = 'bookings' and c.column_name = 'user_id';
-- expect: data_type = uuid, has_fk_to_auth_users >= 1

-- 1d) The booking_availability view must exist and expose only the 4
--     non-identifying columns — no name/phone/email.
select column_name, data_type
from information_schema.columns
where table_schema = 'public' and table_name = 'booking_availability'
order by ordinal_position;
-- expect exactly: id, barber_id, booking_date, time_slot — nothing else,
-- and specifically no name/phone/email columns

-- 1e) The view must actually be selectable by anon and authenticated.
select grantee, privilege_type
from information_schema.role_table_grants
where table_schema = 'public' and table_name = 'booking_availability'
  and grantee in ('anon', 'authenticated');
-- expect: SELECT for both anon and authenticated

-- 1f) "Allow anonymous sign-ins" must be enabled, or none of this works —
--     this is a dashboard setting (Authentication → Providers), not
--     something visible from SQL. There's no reliable query for it; the
--     practical check is Part 2, test F below, or simply opening the site
--     in an incognito window and confirming a booking can be created
--     without ever seeing a login screen.


-- ============================================================================
-- PART 2 — FUNCTIONAL CHECKS (behavioral; each block is wrapped in a
-- transaction that ROLLBACKs, so nothing here permanently changes data)
-- ============================================================================

-- Get two real customer ids to test with — create two test bookings first
-- if you don't already have two different customers (e.g. book once from
-- two separate incognito windows), then find their ids:
select b.id as booking_id, b.user_id as customer_id, b.name, b.booking_date, b.time_slot
from public.bookings b
where b.user_id is not null
order by b.created_at desc
limit 5;

-- Replace the placeholder uuids below with real values from the query
-- above (and a real admin_users.user_id for the admin test) before running
-- each block.

-- TEST A + B: Customer A should see only their own booking(s), never B's.
begin;
select set_config('request.jwt.claims', json_build_object('sub', 'PASTE_CUSTOMER_A_ID_HERE', 'role', 'authenticated')::text, true);
set local role authenticated;
select id, name, phone, email from public.bookings; -- expect: only customer A's row(s)
rollback;

-- TEST C: Customer A tries to cancel Customer B's booking.
begin;
select set_config('request.jwt.claims', json_build_object('sub', 'PASTE_CUSTOMER_A_ID_HERE', 'role', 'authenticated')::text, true);
set local role authenticated;
update public.bookings set status = 'cancelled' where id = 'PASTE_A_BOOKING_ID_BELONGING_TO_CUSTOMER_B_HERE';
-- expect: UPDATE 0 (not an error — the row is simply invisible to this policy)
rollback;

-- TEST D: Customer A tries to create a booking claiming Customer B's identity.
begin;
select set_config('request.jwt.claims', json_build_object('sub', 'PASTE_CUSTOMER_A_ID_HERE', 'role', 'authenticated')::text, true);
set local role authenticated;
insert into public.bookings (name, phone, email, service_id, service_name, barber_id, barber_name, booking_date, time_slot, status, user_id)
values ('test', '000', 'test@test.com', 'svc1', 'test', 'b1', 'test', current_date + 30, '10:00', 'confirmed', 'PASTE_CUSTOMER_B_ID_HERE');
-- expect: ERROR — new row violates row-level security policy
rollback;

-- TEST E: Admin still sees and can manage every booking.
begin;
select set_config('request.jwt.claims', json_build_object('sub', 'PASTE_ADMIN_USER_ID_HERE', 'role', 'authenticated')::text, true);
set local role authenticated;
select count(*) as total_visible_to_admin from public.bookings; -- expect: ALL bookings, not just admin's own
rollback;

-- TEST F: no session at all (anon role — before signInAnonymously resolves,
-- or if it's disabled/failing).
begin;
select set_config('request.jwt.claims', '', true);
set local role anon;
select count(*) as visible_to_anon from public.bookings; -- expect: 0
rollback;

-- AVAILABILITY CHECK: the public view still shows every customer's taken
-- slots (not just the querying customer's own), and admits no PII.
begin;
select set_config('request.jwt.claims', json_build_object('sub', 'PASTE_CUSTOMER_A_ID_HERE', 'role', 'authenticated')::text, true);
set local role authenticated;
select * from public.booking_availability; -- expect: slots from ALL customers, not just A
rollback;
