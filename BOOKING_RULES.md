# Kemekem Barbershop — Booking Rules

**Status:** Working specification. Rules documented here should be treated as the source of truth for booking behavior unless explicitly changed and reviewed.

---

## 1. Booking ownership

- Every customer booking should have a `customer_id` linked to the customer's Supabase Auth user.
- `customer_id` is a UUID referencing `auth.users.id`.
- Customer ownership is enforced by Supabase Row Level Security.
- A customer may read only their own bookings.
- A customer may create only a booking where `customer_id = auth.uid()`.
- A customer may update only their own bookings.
- Customers must never be able to access another customer's booking data.
- The legacy `user_id` column is not the ownership mechanism and must not be used for new ownership security rules.

---

## 2. Customer authentication

- Customers do not use a visible login or signup flow for normal booking.
- The frontend establishes an anonymous Supabase Auth session using `signInAnonymously()` when no existing session is available.
- An existing Supabase session should be reused rather than creating a new anonymous session on every page load.
- The anonymous session provides the customer's `auth.uid()` used for booking ownership.

---

## 3. Booking creation

When a customer creates a booking, the booking should contain the customer's authenticated ID in:

```text
customer_id