# Kemekem Barbershop — Database Documentation

**Status: authoritative, as of this inspection.** Every fact below was read directly from the connected production Supabase project (`yrtlimtnhrzeotynueew`, "Barbershop booking") via live, read-only introspection performed for this document — not carried over from earlier conversation notes, and not copied from `ARCHITECTURE.md`/`PROJECT_CONTEXT.md`. Where those two documents describe something as planned or intended that isn't true of the database yet, this document says so explicitly rather than repeating the intention as if it were current fact.

**Zero database changes were made to produce this document.** Every query below was a read (`list_tables`, or a `SELECT` against `information_schema`/`pg_catalog`).

---

## 1. Production tables — columns and types

Eight tables currently exist in the `public` schema. All columns and types below are exact, from live introspection.

### `bookings` — 38 rows
| Column | Type | Nullable |
|---|---|---|
| `id` | `bigint` (identity) | no (PK) |
| `customer_name` | `text` | no |
| `phone` | `text` | yes |
| `service` | `text` | yes |
| `booking_date` | `date` | yes |
| `booking_time` | `text` | yes |
| `created_at` | `timestamp without time zone` | yes, default `now()` |
| `status` | `text` | yes, default `'pending'` |
| `barber_id` | `text` | yes |
| `barber_name` | `text` | yes |
| `email` | `text` | yes |
| `name` | `text` | yes |
| `service_id` | `text` | yes |
| `service_name` | `text` | yes |
| `time_slot` | `text` | yes |
| `user_id` | `text` | yes |

**`customer_id` does not exist on this table yet.** It is an approved, not-yet-applied design (see §6, §9, §13) — do not assume it's present without re-checking.

### `admin_users` — 0 rows
| Column | Type | Nullable |
|---|---|---|
| `user_id` | `uuid` | no (PK) |
| `email` | `text` | no |
| `created_at` | `timestamptz` | yes, default `now()` |

FK: `admin_users_user_id_fkey` → `auth.users.id`.

**This table currently has zero rows.** No authenticated user currently passes `is_admin()`. This is a real operational gap, independent of any booking-security work — the admin dashboard will not work for anyone until a row is added here.

### `services` — 2 rows
`id text` (PK), `name text`, `description text`, `price text`, `duration text`, `icon_name text` (default `'Scissors'`), `display_order int4` (default `0`), `created_at timestamptz` (default `now()`).

### `team` — 2 rows
`id text` (PK), `name text`, `role text`, `bio text`, `img text`, `display_order int4` (default `0`), `created_at timestamptz` (default `now()`).

Note: the application's `DEFAULT_CONTENT` fallback data includes `experience`, `rating`, and `email` fields per team member — **none of those exist as columns on this table.** They're defaults-only, never persisted or loaded from the database.

### `products` — 6 rows
`id text` (PK), `name text`, `price text`, `phone_number text`, `image_url text`, `display_order int4` (default `0`), `created_at timestamptz`, `updated_at timestamptz` (auto-maintained, see §10), `description text`.

Table comment (set directly on the table in the database): *"Products shown in the "Products" section of the site — ordered by calling the shop, no cart/checkout."*

### `shop_settings` — 0 rows (singleton row expected, currently empty)
`id int4` (PK, `check (id = 1)`, default `1`), `shop_name text`, `hero jsonb`, `about jsonb`, `contact jsonb`, `reviews jsonb`, `recent_looks jsonb`, `time_format text` (default `'24hour'`), `updated_at timestamptz`.

### `blocked_slots` — 0 rows
`id bigint` (identity, PK), `booking_date date`, `booking_time text`, `reason text`.

**See §12 — the application code does not use these column names.** This needs attention independent of the booking-ownership work.

### `appointments` — 0 rows
`id bigint` (identity, PK), `full_name text`, `phone text`, `service text`, `appointment_date date`, `appointment_time time without time zone`, `notes text`, `status text` (default `'pending'`), `created_at timestamptz`.

Not referenced anywhere in `App.jsx` or `AdminDashboardView.jsx`. Has active RLS policies (§4) despite being unused by the current app — see §12.

---

## 2. Foreign keys and relationships

Only one foreign key currently exists anywhere in the `public` schema:

- `admin_users.user_id` → `auth.users.id`

`bookings` has **no foreign keys at all** right now — `user_id` (text) is not FK-constrained to anything (it couldn't be, as a `text` column referencing a `uuid` primary key), and `customer_id` doesn't exist yet. Once the approved migration runs, `bookings.customer_id` → `auth.users.id` will be the second FK in the schema.

## 3. Authentication-related database relationships

- **`admin_users.user_id` → `auth.users.id`** is the only link between the `public` schema and Supabase Auth today. Admin status is determined by row presence here, checked via `is_admin()` (§10).
- **`auth.users`** currently has **1 row total, 0 of which are anonymous** (`is_anonymous = true` count is 0). This is a meaningful signal: the frontend's `signInAnonymously()` code (approved, described in `ARCHITECTURE.md`/`PROJECT_CONTEXT.md`) does not yet appear to have run against this project — if it were live and customers were visiting, anonymous `auth.users` rows would be accumulating. Worth confirming deployment status directly rather than assuming from this alone.
- **`bookings.user_id`** (text) has no relationship to `auth.users` — it's free text, and per prior data audit, holds either `NULL` (36 of 38 rows) or a well-formed UUID *string* that happens to match a real `auth.users.id` (2 of 38 rows) — but that match is coincidental to how the app happened to populate it (see §6), not an enforced relationship.

## 4. Current RLS status for relevant tables

| Table | RLS enabled? |
|---|---|
| `bookings` | **Yes** |
| `admin_users` | Yes |
| `services` | Yes |
| `team` | Yes |
| `products` | Yes |
| `blocked_slots` | Yes |
| `appointments` | Yes |
| `shop_settings` | **No — critical, see below** |

**`shop_settings` has Row Level Security disabled.** It has policies defined (§5) that describe an admin-write / public-read model, but because RLS itself is off at the table level, those policies are not enforced — the table is fully readable *and writable* by anyone holding the public anon key, policies notwithstanding. One specific, useful detail for whoever fixes this: because sensible policies already exist and just aren't active, simply running `ALTER TABLE public.shop_settings ENABLE ROW LEVEL SECURITY;` should immediately activate the intended protection — no new policies need to be written first. This is a distinct issue from the booking-ownership work and should be treated as its own reviewed change, not bundled in.

## 5. Current RLS policies — exactly what each allows

### `bookings` (5 policies — the ones the ownership migration targets)
| Policy | Command | Role | Allows |
|---|---|---|---|
| Public can view bookings | SELECT | `public` | Anyone — including fully unauthenticated requests — can read every column of every booking row. |
| Public can create bookings | INSERT | `public` | Anyone can create a booking row, unrestricted. |
| Allow public booking cancellation | UPDATE | `anon` | Anyone, unauthenticated, can update **any** booking row — not scoped to a specific booking or requester in any way. |
| Admins can update bookings | UPDATE | `public` | Update allowed if `is_admin()` is true for the caller. |
| Admins can delete bookings | DELETE | `public` | Delete allowed if `is_admin()` is true for the caller. |

The first three are the actual vulnerability this project's booking-ownership work exists to fix.

### `admin_users` (1 policy)
| Policy | Command | Role | Allows |
|---|---|---|---|
| Admins can view own admin row | SELECT | `public` | `auth.uid() = user_id` — a caller can see only their own row, if one exists. |

No INSERT/UPDATE/DELETE policy exists at all — nobody can modify `admin_users` through the client, by design or omission; adding an admin currently requires direct database access.

### `appointments` (2 policies)
| Policy | Command | Role | Allows |
|---|---|---|---|
| Anyone can create appointments | INSERT | `anon` | Unrestricted insert. |
| Anyone can view appointments | SELECT | `anon` | Unrestricted read. |

Fully open, same shape as the old `bookings` vulnerability — but on a table the current app never uses.

### `blocked_slots` (2 policies)
Admin-manage-all (`is_admin()`) + public-read-all (`true`). Reasonable shape for its apparent purpose.

### `services` / `team` (2 policies each, same shape)
Admin-manage-all (`is_admin()`) + public-read-all (`true`).

### `products` (4 policies)
Public SELECT (`anon, authenticated`, unrestricted), plus separate admin-gated INSERT/UPDATE/DELETE — but these three **inline** `EXISTS (SELECT 1 FROM admin_users WHERE admin_users.user_id = auth.uid())` rather than calling `is_admin()`. Functionally identical to `is_admin()` today, but it's a second, duplicated expression of the same rule — worth standardizing on `is_admin()` if this table's policies are ever touched, though not urgent.

### `shop_settings` (2 policies — currently inert, see §4)
Admin-update (`is_admin()`) + public-read (`true`) — not enforced while RLS is off.

## 6. `bookings.user_id` and `bookings.customer_id`

**`user_id` (text) — exists now, legacy, must not be silently converted or removed** (per approved architecture). Current data, from the most recent full audit: 38 total rows, 36 with `user_id IS NULL`, 2 with a well-formed UUID string that matches a real `auth.users.id`. Not FK-constrained. Written by the app's booking-creation code but, prior to the anonymous-auth change, could only ever be populated when an authenticated *admin* created a booking — ordinary customers had no real session to source an id from, so their bookings wrote `NULL`.

**`customer_id` (uuid) — approved design, not yet present on the table.** The intended shape, per the reviewed and approved migration: nullable, FK to `auth.users(id)`, indexed, and the sole ownership key for RLS (`customer_id = auth.uid()`). Until the migration actually runs, this column does not exist — confirmed by direct introspection for this document, not assumed from prior conversation.

## 7. Legacy / unpopulated columns — verified, not assumed

| Column | Table | Populated rows | Status |
|---|---|---|---|
| `booking_time` | `bookings` | **0 of 38** | Legacy — confirmed unused by the app (`time_slot` is used everywhere instead) and confirmed empty in the live table. |
| `service` | `bookings` | **0 of 38** | Legacy — confirmed unused (`service_id`/`service_name` are the live pair) and confirmed empty. |
| `user_id` | `bookings` | 2 of 38 non-null | Not "unpopulated," but its 36 NULLs reflect the pre-anonymous-auth era described above — see §6. |

`time_slot` is populated on all 38 rows and is the column actually read/written throughout the app — confirmed live, matching the architecture documents' stated assumption.

## 8. `booking_availability` view

**Does not exist yet.** Confirmed via direct introspection for this document — it is an approved, specified design (§9 of `ARCHITECTURE.md`), not a current database object. When created, per the reviewed migration, it is specified to expose exactly:

```
id, barber_id, booking_date, time_slot
```

filtered to `status = 'confirmed'`, granted to `anon` and `authenticated`, with no name/phone/email/`user_id`/`customer_id` or any other column. This document will need a one-line update once the migration actually runs and the view can be confirmed to exist with these exact columns.

## 9. Database security rules and ownership rules (current + approved-next)

- **Enforcement is at the database, not the frontend.** No custom backend exists; every write the client makes is only as safe as the RLS policy governing it.
- **Current, live state:** `bookings` is openly readable and partially openly writable by anyone (§5) — the opposite of the intended model.
- **Approved, not-yet-applied state:** ownership by `customer_id = auth.uid()`; admin bypass via `is_admin()`; `anon`/unauthenticated `public` granted nothing on `bookings`.
- **`user_id` is explicitly out of scope for the ownership model** — it must not become a security-relevant column; `customer_id` is the only column RLS should ever check for booking ownership.

## 10. Database functions relevant to authorization

### `public.is_admin()`
```sql
CREATE OR REPLACE FUNCTION public.is_admin()
 RETURNS boolean
 LANGUAGE sql
 STABLE SECURITY DEFINER
AS $function$
  select exists (
    select 1 from admin_users where user_id = auth.uid()
  );
$function$
```
`SECURITY DEFINER` — runs with the function owner's privileges, so it can check `admin_users` regardless of the caller's own row-level access to that table. This is the single source of truth for "is the current caller an admin," used directly by `bookings`, `blocked_slots`, `services`, `team`, and `shop_settings` policies; `products`' policies duplicate its logic inline instead of calling it (§5).

### `public.set_products_updated_at()`
```sql
CREATE OR REPLACE FUNCTION public.set_products_updated_at()
 RETURNS trigger
 LANGUAGE plpgsql
AS $function$
begin
  new.updated_at = now();
  return new;
end;
$function$
```
Not auth-related — a trigger function (`trg_products_updated_at`, `BEFORE UPDATE ON public.products`) that stamps `updated_at`. Documented here only because it's the only other function in the schema, for completeness.

No other functions exist in the `public` schema.

## 11. Constraints and indexes

**`bookings` has exactly one constraint and one index: the primary key on `id`.** Nothing else — no unique constraint, no other index.

Concretely: there is **no database-level protection against double-booking the same barber/date/time**. The application's own comments assume a unique index on `(barber_id, booking_date, time_slot)` exists; it does not, confirmed by direct inspection of `pg_constraint`. Double-booking prevention today is entirely client-side (the availability grid check). This is unrelated to the ownership work but is a real gap worth its own review.

`admin_users` has its primary key (`user_id`) and the FK to `auth.users`. No other table has any constraint beyond its primary key.

## 12. Known database issues / technical debt — do not "fix" without architectural review

1. **`shop_settings` has RLS disabled** (§4) — critical, live, unrelated to booking work. Flagging per this project's own rule that this needs separate security attention.
2. **`blocked_slots` schema does not match the application code.** The app (`handleBlockTimeSlot`, `handleUnblockTimeSlot` in `App.jsx`) reads and writes `barber_id`, `blocked_date`, `time_slot`, and `blocked_by` — **none of these exist as columns on the live table**, which actually has `booking_date`, `booking_time`, and `reason`, and has no `barber_id` column at all. This means the admin "block a time slot" feature is very likely non-functional against production as currently written (inserts/deletes referencing nonexistent columns would error). This is a new finding from this inspection, not previously documented — needs its own investigation into which side (code or schema) reflects the intended design before anything is changed.
3. **`appointments` table** — exists, has active and fully permissive RLS policies (anon can read/write everything), 0 rows, unreferenced anywhere in the current app. Per `ARCHITECTURE.md`, do not modify or remove without confirming its purpose first — possibly a leftover from an earlier iteration, possibly used by something outside this codebase.
4. **No unique constraint backing double-booking prevention** (§11) — client-side only today.
5. **`products` RLS policies duplicate `is_admin()`'s logic inline** instead of calling it (§5, §10) — a consistency/maintainability item, not a security hole, since both expressions are currently equivalent.
6. **`admin_users` has zero rows** — independent of any code change; the admin dashboard cannot work for anyone until a row exists here, and there's currently no client-facing way to create one (no INSERT/UPDATE policy on `admin_users` at all).

## 13. Do Not Change Casually

- **`bookings.user_id`** — legacy `text` column. Do not convert its type, rename it, drop it, or repurpose it for ownership. It is intentionally being left alone by the current security work.
- **`bookings.customer_id`** — once added, this is the ownership column. RLS ownership logic must use `customer_id = auth.uid()` — never `user_id`.
- **`time_slot`** — the live booking-time column. Do not consolidate with or migrate toward `booking_time`, which is confirmed legacy and empty.
- **`is_admin()`** — relied on by policies across five tables (soon six, including the new `bookings` policies). Changing its logic is a cross-cutting change, not a local one.
- **`blocked_slots` columns** — do not rename either side (code or schema) to "fix" the mismatch in §12 without first confirming which one reflects the actual intended design; either direction is a real, live-data-affecting schema/behavior decision.
- **`shop_settings` RLS** — do not simply flip RLS on without a deliberate, reviewed change, even though the existing policies would likely work correctly immediately (§4) — this should still be its own verified step, not a side effect of unrelated work.
- **`appointments` table** — do not modify or drop without first confirming what it's for.
- **`booking_availability`** (once created) — must never be widened to include `name`, `phone`, `email`, `user_id`, or `customer_id`. Its entire purpose is being the non-PII counterpart to `bookings`.

---

## What was inspected for this document

- `list_tables` (verbose) for the `public` schema — every table, column, type, nullability, default, row count, primary key, foreign key, and the platform's own security advisory.
- Direct `SELECT` against `pg_policies` for every policy on every `public` table.
- Direct `SELECT` against `pg_constraint` and `pg_indexes` for `bookings`.
- Direct `SELECT` against `pg_proc`/`pg_namespace` for every function in `public`, with full definitions.
- Direct `SELECT`s for: `bookings` status distribution, `auth.users` totals (including anonymous count), and populated-row counts for `booking_time` and `service`.
- Cross-referenced `blocked_slots` usage directly against the current `App.jsx` source to confirm the column-name mismatch in §12.

## What was documented

Sections 1–13 above, covering all 8 current `public` tables, the one existing foreign key, both current functions, every current RLS policy on every table, and a clear, explicit separation between what's live today versus what's approved-but-not-yet-applied (`customer_id`, `booking_availability`).

## Uncertainties

- Whether the anonymous-auth frontend change is actually deployed to the live site — `auth.users` shows 0 anonymous rows, which is *consistent with* "not deployed yet" but isn't direct proof (e.g., zero site traffic since it went live would look the same). Worth confirming directly rather than inferring from this number alone.
- The intended resolution of the `blocked_slots` mismatch (§12) — I'm not speculating on which side is "correct"; that's a design decision, not something inspection alone can answer.
- The original purpose of the `appointments` table — genuinely unknown from what's inspectable here.

## Confirmation

Zero database changes were made — every operation this turn was `list_tables` or a read-only `SELECT`. Zero application code was modified — no file other than this new `DATABASE.md` was touched.
