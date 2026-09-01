# Kemekem Barbershop — Project Context

## 1. Project Identity

Project: Kemekem Barbershop

This is a production barber-shop management and customer booking platform.

Primary goal:
Build a secure, professional, mobile-friendly barbershop platform that supports customer bookings, owner/admin management, and eventually payments, memberships, packages, gift cards, QR check-in, and digital wallet passes.

IMPORTANT:
This is a real production application with real customer data.

Never treat production data as test data.
Never invent database results.
Never claim a database change was made unless it was actually executed and confirmed.

---

## 2. Technology Stack

Frontend:
- React
- Vite
- JavaScript / JSX
- Tailwind CSS
- lucide-react
- AOS

Backend:
- Supabase
- PostgreSQL
- Supabase Auth
- Supabase Realtime

There is currently no traditional custom backend/API layer.
The React frontend communicates directly with Supabase.

Environment variables:
- VITE_SUPABASE_URL
- VITE_SUPABASE_ANON_KEY

Authentication:
- Supabase Auth
- Customer anonymous authentication is being introduced for booking ownership.
- Admin authentication uses Supabase Auth plus the admin_users allow-list.

Languages:
- English
- Amharic

---

## 3. Important Files

### src/App.jsx

This is currently the main application file.

It contains:
- Public website
- Navigation
- Hero
- Services
- About
- Gallery
- Team
- Products
- Reviews
- Footer
- Booking flow
- My Bookings
- Booking modal
- Gallery lightbox
- Product modal
- Owner login
- Several admin edit modals
- Most application state
- Most Supabase queries and mutations

WARNING:
App.jsx is very large.

Do NOT perform large refactors casually.

Before changing App.jsx:
1. Understand the existing behavior.
2. Make the smallest safe change.
3. Preserve existing functionality.
4. Run the build/checks afterward.

### src/AdminDashboardView.jsx

Owner/admin dashboard UI.

Contains:
- Bookings
- Blocked Slots
- Services
- Team
- Recent Looks
- Products
- Settings & Security

It is lazy-loaded so normal customers do not download the admin dashboard unnecessarily.

---

## 4. Current Architecture

Current architecture is intentionally simple:

React frontend
        |
        v
Supabase JS client
        |
        v
Supabase PostgreSQL / Auth / Realtime

There is no custom backend.

Therefore:
SECURITY MUST be enforced by Supabase RLS and database policies, not merely by frontend checks.

Never rely on hiding UI as a security mechanism.

---

## 5. Booking System

Current booking flow:

Service
→ Barber
→ Date
→ Time
→ Customer information
→ Confirmation

Important booking concepts:
- barber_id
- barber_name
- service_id
- service_name
- booking_date
- time_slot
- status
- user_id
- customer_id
- customer contact information

Availability uses:
- shop opening hours
- booked slots
- blocked slots
- time_slot

Do NOT use the legacy booking_time column for availability.

The production database confirmed that time_slot is the live field.

---

## 6. Customer Ownership Security

A security migration is being implemented.

Before this migration:
- bookings had unsafe public access policies
- customer ownership was not securely enforced
- user_id was text and many existing bookings have NULL user_id

Current production baseline:
- bookings: 38 rows
- user_id NULL: 36
- user_id non-NULL: 2

A new nullable UUID column is being introduced:

customer_id uuid

It references:

auth.users(id)

The customer_id column is intended to establish trustworthy ownership of bookings.

IMPORTANT:
Do NOT change or repurpose user_id without explicit architectural approval.

The new ownership system should use customer_id.

---

## 7. Customer Authentication

Customer anonymous authentication is enabled in Supabase.

The frontend should:
1. Check whether an existing Supabase session exists.
2. Reuse the existing session if present.
3. Only call signInAnonymously() when there is no session.
4. Never show a login/signup screen merely because anonymous authentication is being used.

Customer booking inserts should associate the booking with the authenticated customer's ID through customer_id.

---

## 8. Booking RLS

The booking security model is:

### Admins

Admins have full access to bookings through:

is_admin()

Admin authorization is based on the admin_users table.

### Customers

Customers may:
- read their own bookings
- create their own bookings
- update their own bookings

Ownership condition:

customer_id = auth.uid()

Customers must NOT be able to read or modify other customers' bookings.

Anonymous/public users must NOT receive unrestricted access to the bookings table.

---

## 9. booking_availability

A public non-PII availability view is used instead of exposing the full bookings table.

The intended columns are:

- id
- barber_id
- booking_date
- time_slot

It must NOT expose:

- customer name
- phone
- email
- user_id
- customer_id
- other customer-identifying information

The view is intended for availability checking only.

---

## 10. Database Safety Rules

This is a production database.

Before any SQL that modifies the database:

1. Explain exactly what will change.
2. Explain why it is needed.
3. Prefer additive/idempotent migrations.
4. Avoid destructive changes.
5. Do not delete production data unless explicitly authorized.
6. Do not rename/drop existing columns casually.
7. Verify current schema before assuming it.
8. Provide a verification query after the migration.
9. Never claim SQL was executed unless execution actually occurred.
10. Prefer read-only inspection before write operations.

For migrations:
- use BEGIN/COMMIT when appropriate
- use IF EXISTS / IF NOT EXISTS when safe
- preserve existing data
- verify the result afterward

---

## 11. Current Known Production Facts

These facts were confirmed from the real Supabase project.

bookings:
- 38 total rows
- 36 user_id NULL
- 2 user_id non-NULL
- user_id remains text
- customer_id is the new ownership field

RLS:
- bookings RLS is enabled

Existing booking security work:
- public unrestricted booking policies are being removed
- customer ownership policies are being introduced
- admin access uses is_admin()

Other known production findings:
- admin_users currently has 0 rows
- shop_settings previously had RLS disabled and must be treated as a separate security issue
- an appointments table exists but appears unused by the current application
- booking_time is legacy/unpopulated
- service is legacy/unpopulated
- service_id and service_name are the active service fields

IMPORTANT:
These facts are historical inspection results.
If making a new decision based on current database state, re-check the database rather than assuming these values have not changed.

---

## 12. Current Codebase Problems

Known issues identified during code review:

### Architecture
- App.jsx is approximately 5,600 lines.
- Too much state and business logic lives in App.jsx.
- Many reusable UI components have not been extracted.
- AdminDashboardView still receives many props.

### Data / security
- Customer ownership was previously weak and relied heavily on frontend behavior.
- Booking data must never be broadly exposed to customers.
- RLS is critical.

### Images
Images are currently stored as base64 text in PostgreSQL in several places.

Long-term plan:
Move image storage to Supabase Storage and store URLs in the database.

### Barber data
The existing barber editing flow has known field-mapping problems involving fields such as:
- experience
- email
- rating
- bio

Do not assume these fields are correctly persisted without checking the current code/schema.

### Notifications
The UI contains email/SMS confirmation messaging, but an actual email/SMS provider integration was not present in the reviewed code.

Do not tell customers that email/SMS has been implemented unless the integration has actually been added and tested.

### Future features
Not yet implemented:
- payments
- memberships
- visit packages
- gift cards
- QR check-in
- digital wallet passes

---

## 13. Planned Development Order

Do NOT jump randomly between features.

Recommended order:

Phase 0:
Security and concrete existing bugs

Phase 1:
Customer accounts/ownership
Image storage
Initial component decomposition
Database/RLS documentation

Phase 2:
Payments

Phase 3:
Memberships and visit packages

Phase 4:
Gift cards

Phase 5:
QR check-in

Phase 6:
Apple Wallet / Google Wallet passes

Testing and type-safety should improve continuously throughout these phases.

---

## 14. AI Development Rules

This project may be worked on by multiple AI systems.

Every AI must follow these rules:

### Never invent facts

If something is unknown:
say it is unknown.

If database access is unavailable:
do not pretend it was inspected.

If a command was not executed:
do not claim it was executed.

### Preserve existing behavior

Do not rewrite large portions of the application just because a different architecture seems cleaner.

Prefer:
small
safe
testable
reversible changes.

### Before coding

Understand:
- current files
- current data model
- current security model
- existing behavior
- dependencies

### After coding

Run appropriate checks:
- build
- type checking if available
- linting if available
- targeted tests if available

Report:
- what changed
- what was tested
- what was NOT tested
- any remaining risks

---

## 15. AI Team Responsibilities

### ChatGPT
Role:
CTO / Architect / Reviewer

Responsibilities:
- architecture
- requirements
- security reasoning
- database design
- implementation specifications
- review other AI work
- decide priorities

ChatGPT should generally avoid making uncontrolled large code changes.

### Claude
Role:
Senior implementation developer

Responsibilities:
- implement approved specifications
- modify React code
- implement Supabase changes
- refactor carefully
- run build/checks
- report exact changes

### Cursor
Role:
Codebase engineering environment / multi-agent developer

Responsibilities:
- repository-wide analysis
- parallel development
- debugging
- refactoring
- testing
- implementation across multiple files

### Gemini
Role:
Independent UI/UX reviewer and second technical opinion

Responsibilities:
- UI review
- mobile review
- accessibility review
- visual consistency
- independent critique

### GitHub Copilot
Role:
Optional code/PR reviewer

Responsibilities:
- review changes
- inspect pull requests
- identify regressions
- additional repository-level review

---

## 16. Golden Rule

No AI is the sole authority.

The workflow is:

USER
↓
ChatGPT — architecture/specification
↓
Claude/Cursor — implementation
↓
Gemini/Copilot — independent review
↓
ChatGPT — final review
↓
User approves deployment

For database migrations:

INSPECT
↓
PLAN
↓
BACKUP/BASELINE WHEN APPROPRIATE
↓
MIGRATE
↓
VERIFY
↓
ONLY THEN continue

---

## 17. Change Discipline

Every significant change should have:

1. Clear objective
2. Files affected
3. Database objects affected, if any
4. Security implications
5. Implementation
6. Verification
7. Rollback/recovery plan when appropriate

Never combine unrelated fixes into a migration simply because they are convenient.

---

## 18. Current Priority

The immediate priority is to safely complete the customer booking ownership/security work.

Do not begin payments, memberships, gift cards, QR check-in, wallet passes, or major refactoring until the current booking security migration and verification are completed and the production application is confirmed healthy.