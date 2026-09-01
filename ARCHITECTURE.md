# Kemekem Barbershop — Architecture

## 1. Architecture Overview

Kemekem is currently a client-heavy React application using Supabase as its backend platform.

High-level architecture:

Browser
  ↓
React / Vite application
  ↓
Supabase JavaScript client
  ↓
Supabase
  ├── Authentication
  ├── PostgreSQL
  ├── Row Level Security
  ├── Realtime
  └── Storage (planned / future migration for images)

There is currently no custom Node.js/Express backend.

Security-sensitive operations must therefore be enforced at the Supabase/database layer.

---

## 2. Frontend Structure

The current frontend is centered around:

src/
├── App.jsx
├── AdminDashboardView.jsx
└── ...

### App.jsx

App.jsx currently acts as the primary application container.

Responsibilities include:

- application state
- public page rendering
- navigation
- booking workflow
- customer booking retrieval
- availability calculations
- Supabase queries
- Supabase mutations
- authentication/session initialization
- owner authentication
- several modal interfaces
- admin-related editing logic
- localization

This is currently a monolithic architecture.

### AdminDashboardView.jsx

AdminDashboardView contains the owner dashboard UI.

Major areas:

- Bookings
- Blocked Slots
- Services
- Team
- Recent Looks
- Products
- Settings & Security

The admin dashboard is lazy-loaded so ordinary customers do not unnecessarily download the admin interface.

---

## 3. Current Data Flow

### Public content

Typical flow:

Supabase
  ↓
App.jsx
  ↓
React state
  ↓
Public UI

Examples:
- services
- team
- products
- shop settings
- gallery content
- reviews

---

## 4. Booking Data Flow

Customer:

Select service
  ↓
Select barber
  ↓
Select date
  ↓
Select time
  ↓
Enter customer information
  ↓
Create booking
  ↓
Supabase bookings table

Important booking fields include:

- id
- customer_id
- user_id
- customer_name
- name
- phone
- email
- service_id
- service_name
- barber_id
- barber_name
- booking_date
- time_slot
- status
- created_at

IMPORTANT:

`customer_id` is the new ownership field.

`user_id` is a legacy text field and must not be repurposed or converted without explicit approval.

---

## 5. Authentication Architecture

### Customers

Customers use Supabase anonymous authentication.

The intended flow is:

Application starts
  ↓
Check existing Supabase session
  ↓
Existing session?
  ├── YES → reuse session
  └── NO → signInAnonymously()
  ↓
Customer receives an invisible Supabase Auth identity
  ↓
Booking can use auth.uid()

No visible customer login/signup screen is required for anonymous booking.

### Admin

Admin authentication uses:

Supabase Auth
  ↓
Authenticated user
  ↓
admin_users allow-list
  ↓
is_admin()
  ↓
Admin permissions

Admin authorization must never rely solely on frontend state.

---

## 6. Database Security Architecture

The database is the security boundary.

Frontend checks are useful for UX.

They are NOT sufficient for authorization.

For protected data:

Frontend
  ↓
Supabase request
  ↓
PostgreSQL RLS
  ↓
Allowed / denied

### bookings

RLS is enabled.

The intended ownership model is:

customer_id = auth.uid()

Customer policies:

SELECT:
customer can read their own booking.

INSERT:
customer can create a booking where customer_id equals their authenticated ID.

UPDATE:
customer can modify their own booking.

Admin:

is_admin()

Admins have full booking access.

---

## 7. booking_availability

Customers need to know which time slots are occupied.

They should not need access to the entire bookings table.

Therefore:

Customer frontend
      ↓
booking_availability view
      ↓
Only:
- id
- barber_id
- booking_date
- time_slot

The availability view must not expose:

- name
- phone
- email
- customer_id
- user_id
- other customer information

This creates a separation between:

BOOKING DATA

and

AVAILABILITY DATA.

---

## 8. Important Database Tables

### bookings

Core appointment records.

Security-sensitive.

### admin_users

Determines which authenticated users have administrative access.

### services

Barbershop services.

### team

Barbers/team members.

### products

Products displayed by the shop.

### shop_settings

Business/site configuration.

IMPORTANT:
Its RLS configuration requires separate security attention.

### blocked_slots

Used to manually prevent booking availability.

### appointments

Exists in the production database but appears unrelated to the current application.

Do not modify or remove it without confirming its purpose.

---

## 9. Realtime

Supabase Realtime is used for selected data.

Currently relevant areas include:

- bookings
- products

Purpose:

When an admin changes relevant data, open customer pages can receive updates without requiring a complete manual refresh.

Do not remove Realtime subscriptions during refactoring without verifying the effect on the customer/admin experience.

---

## 10. Availability Logic

Booking availability depends on multiple conditions.

Conceptually:

Available slot =
shop is open
AND barber is available
AND slot is not blocked
AND slot is not already booked

The application currently performs significant availability logic on the frontend.

Future improvements may move more authoritative conflict enforcement into PostgreSQL.

IMPORTANT:

Client-side availability checks are not sufficient to guarantee no double-booking.

Database-level constraints/transactions should eventually enforce booking uniqueness.

---

## 11. State Management

There is currently no dedicated global state-management library.

Most state is held in App.jsx using React hooks.

Current architecture therefore resembles:

App.jsx
├── navigation state
├── modal state
├── booking state
├── authentication state
├── content state
├── admin state
├── availability state
└── localization state

This creates significant coupling.

---

## 12. Refactoring Direction

Do NOT rewrite App.jsx all at once.

Future refactoring should gradually move toward:

src/
├── components/
│   ├── ui/
│   ├── booking/
│   ├── services/
│   ├── team/
│   ├── products/
│   └── reviews/
│
├── pages/
│   ├── public/
│   └── admin/
│
├── hooks/
│
├── services/
│   ├── supabase/
│   └── booking/
│
├── utils/
│
├── constants/
│
└── App.jsx

This is a target architecture, NOT a command to immediately reorganize the entire repository.

Refactor incrementally.

---

## 13. Supabase Access Rules

Database calls should eventually be separated from presentation logic.

Preferred direction:

UI component
  ↓
custom hook / application service
  ↓
Supabase service
  ↓
Supabase

Instead of:

UI component
  ↓
large inline Supabase query
  ↓
database

However, this separation should happen gradually.

Do not introduce unnecessary abstraction merely for architectural purity.

---

## 14. Image Architecture

Current system:

Images
  ↓
base64 strings
  ↓
PostgreSQL text fields

Problems:

- large database rows
- larger network payloads
- slower page loads
- unnecessary database storage
- poor image optimization

Target architecture:

Image
  ↓
Supabase Storage
  ↓
public/signed URL
  ↓
database stores URL
  ↓
frontend loads image

This migration should be handled as a dedicated project step.

Do not mix it into unrelated booking/security work.

---

## 15. Error Handling

Important principle:

Database errors must not be silently ignored.

For mutations:

try
  ↓
Supabase operation
  ↓
success?
  ├── YES → update UI
  └── NO → surface useful error

Errors should be:

- understandable to the user when appropriate
- detailed in development logs
- never allowed to silently corrupt application state

---

## 16. Deployment Architecture

Current intended flow:

Developer
  ↓
Git repository
  ↓
Build
  ↓
Deployment platform
  ↓
Production website

Before production deployment:

1. Build must succeed.
2. No new lint errors should be introduced.
3. Database migrations must be verified separately.
4. Authentication must be tested.
5. Booking flow must be tested.
6. Admin flow must be tested.
7. Mobile experience should be checked.

Never assume:

"Build succeeded"

means:

"Production is safe."

---

## 17. AI Agent Architecture

Multiple AI systems may work on the same repository.

### ChatGPT

Architect.

Defines:
- requirements
- architecture
- specifications
- security decisions
- implementation tasks

### Claude

Primary implementation developer.

Should:
- inspect repository
- implement approved tasks
- modify code
- run checks
- report changes

### Cursor

Repository-level engineering environment.

Useful for:
- codebase analysis
- multi-file changes
- debugging
- refactoring
- testing
- parallel agents

### Gemini

Independent reviewer.

Useful for:
- visual review
- UX
- mobile
- accessibility
- alternative implementation opinions

### GitHub Copilot

Optional additional reviewer/PR agent.

---

## 18. AI Handoff Protocol

Every AI receiving the project should first read:

1. PROJECT_CONTEXT.md
2. ARCHITECTURE.md

Then inspect the relevant source files.

Before implementation:

- identify assumptions
- identify dependencies
- identify affected files
- identify database changes
- identify security implications

After implementation:

- describe exactly what changed
- list files changed
- report tests/checks
- report remaining risks

Never fabricate execution results.

---

## 19. Feature Development Protocol

Every significant feature follows:

REQUEST
  ↓
BUSINESS REQUIREMENTS
  ↓
TECHNICAL SPECIFICATION
  ↓
DATABASE DESIGN
  ↓
SECURITY DESIGN
  ↓
IMPLEMENTATION
  ↓
TESTING
  ↓
CODE REVIEW
  ↓
PRODUCTION VERIFICATION

Do not skip directly from:

"idea"

to

"large code rewrite."

---

## 20. Current Priority

The immediate technical priority is:

Complete and verify secure customer booking ownership.

Only after that should major architectural refactoring begin.

The next larger architectural goals are:

1. Secure booking system
2. Stable customer identity
3. Database integrity
4. Image storage migration
5. Component decomposition
6. Testing infrastructure
7. Payments
8. Memberships/packages
9. Gift cards
10. QR check-in
11. Digital wallet

---

## 21. Golden Architectural Rule

Prefer:

SAFE
SMALL
REVERSIBLE
VERIFIABLE

over:

FAST
LARGE
DESTRUCTIVE
UNTESTED

The goal is not simply to make Kemekem work.

The goal is to make Kemekem maintainable by a team of humans and AI agents without losing control of the system.