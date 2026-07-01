# ✂️ Kemekem Barbershop Website

Modern barbershop website for **Kemekem Barbershop, Addis Ababa**.  
Built with **React 18 + Vite + Tailwind CSS + Supabase**.

---

## Features

- 🌐 **Bilingual** — English and Amharic
- 📅 **Online Booking** — 5-step flow with double-booking prevention
- 🔐 **Owner Admin Panel** — secured via Supabase Auth + `admin_users` RLS
- 📊 **Realtime Bookings** — Supabase Realtime keeps admin dashboard live
- 🗓️ **Blocked Slots** — owner can block individual barber time slots
- ⏰ **Flexible Time Formats** — 24-hour, 12-hour, or Ethiopian
- 🖼️ **Gallery Management** — upload and manage recent looks
- 🔒 **Row Level Security** — all tables protected by Supabase RLS policies

---

## Quick Start

### 1. Clone / unzip

```bash
unzip kemekem-barbershop.zip
cd kemekem-barbershop
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment

```bash
cp .env.example .env
```

Edit `.env` and add your Supabase credentials:

```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
```

> The project ships with a pre-filled `.env` for the Kemekem Supabase project.  
> If you're using your own Supabase project, replace both values.

### 4. Run the Supabase schema (first time only)

Open **Supabase Dashboard → SQL Editor** and run `supabase_schema.sql`.

### 5. Create your admin account

1. Supabase Dashboard → **Authentication → Users → Add User**
2. Enter your email and a strong password
3. In SQL Editor, run:

```sql
insert into admin_users (user_id, email)
select id, email from auth.users where email = 'your@email.com'
on conflict (user_id) do nothing;
```

### 6. Start development server

```bash
npm run dev
```

Visit [http://localhost:5173](http://localhost:5173)

---

## Project Structure

```
kemekem-barbershop/
├── public/
│   └── favicon.svg          — Amber scissors icon
├── src/
│   ├── App.jsx              — Complete single-component app (3 500+ lines)
│   ├── main.jsx             — React root mount
│   └── index.css            — Tailwind imports + custom styles
├── .env                     — Supabase credentials (do NOT commit)
├── .env.example             — Template for new environments
├── .gitignore
├── eslint.config.js
├── index.html               — HTML shell with meta tags
├── package.json
├── postcss.config.js
├── tailwind.config.js       — Includes custom zinc-850 color
├── vite.config.js           — Code-splitting for vendor chunks
└── supabase_schema.sql      — Run once in Supabase SQL Editor
```

---

## Database Schema (Supabase)

| Table | Purpose | RLS |
|-------|---------|-----|
| `services` | Service catalog (cuts, shaves…) | Public read, admin write |
| `team` | Barber profiles | Public read, admin write |
| `bookings` | Customer bookings | Public insert+read, admin update |
| `blocked_slots` | Admin-blocked time slots | Public read, admin write |
| `shop_settings` | One-row config blob | Public read, admin update |
| `admin_users` | Maps auth UID → admin role | Admin read only |

**Double-booking prevention** uses a Postgres partial unique index:

```sql
create unique index unique_active_booking_slot
  on bookings (barber_id, booking_date, time_slot)
  where status in ('confirmed', 'pending');
```

---

## Deployment

### Vercel (recommended)

```bash
npm install -g vercel
vercel
```

Set the following environment variables in Vercel project settings:
- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`

### Netlify

```bash
npm run build
# Deploy the dist/ folder
```

Add the same env vars in Netlify Site Settings → Environment Variables.

### Manual (any static host)

```bash
npm run build
# Upload dist/ contents to your web server / CDN
```

---

## Admin Panel

1. Click the **Owner Login** button (bottom-left of screen)
2. Sign in with your Supabase Auth email and password
3. Dashboard opens with 6 tabs:
   - **Bookings** — view, update status, cancel
   - **Blocked Slots** — prevent bookings for specific barbers/dates
   - **Services** — add, edit, delete services
   - **Team** — manage barber profiles
   - **Recent Looks** — upload gallery images
   - **Settings** — time format, about section, owner password change

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | React 18 |
| Build tool | Vite 5 |
| Styling | Tailwind CSS 3 |
| Icons | Lucide React |
| Database | Supabase (PostgreSQL) |
| Auth | Supabase Auth |
| Realtime | Supabase Realtime |

---

## License

Private project — all rights reserved.
