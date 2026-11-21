# FixMate - Smart Device & Home Appliance Repair Service Platform

FixMate is an on-demand, role-based repair service booking platform built with Next.js (App Router), Tailwind CSS, Express, MongoDB, and Stripe.

## Project Purpose
In Bangladesh and worldwide, individuals struggle to find trustworthy repair technicians. Customers often lack visibility into what happens after handing over expensive devices and face arbitrary charges before work is verified. FixMate addresses this with a strict role-based status pipeline (Requested → Accepted → In Progress → Completed) and a pay-after-service guarantee where Stripe payment is unlocked only after repair completion.

## Live Application & Repository
- **Live Site**: https://fixmate-app.vercel.app *(replace with production URL upon deploy)*
- **Client Repository**: *(Client Git Repository)*
- **Server Repository**: *(Server Git Repository)*

## Credentials for Testing
- **Administrator**:
  - Email: `admin@fixmate.com`
  - Password: `Admin123!`
- **Technicians**:
  - `rashed@fixmate.com` / `Tech123!` (Smartphone & Laptop specialist)
  - `tariq@fixmate.com` / `Tech123!` (HVAC & Home Appliance specialist)
- **Customers**:
  - `tanvir@gmail.com` / `Cust123!`
  - `sarah@gmail.com` / `Cust123!`

## Key Platform Features
1. **10-Section Landing Page Design**:
   - Engineered to exact industrial aesthetic specification with `#1b2932` dark slate and `#02444b` alternate teal grounds.
   - Browser framed product interfaces, verified brand clouds, 3 alternating feature rows, 3-step process protocol, prominent testimonials, 3 tier pricing, 6-item interactive FAQ accordion, and inverted high-contrast closing banner.
2. **Server-Side Search, Filter & Sort**:
   - Search by problem keyword or title, filter by category or service mode (Home Visit / Shop Drop-off), and sort by price or newest.
   - URL query parameter state persistence across reloads.
3. **Role-Based Portals & Pipelines**:
   - **Customer**: Manage requests, cancel bookings while pending, pay verified completed jobs with Stripe, view receipts.
   - **Technician**: Add repair listings with ImgBB upload, full CRUD catalog with availability toggle, status transitions (Accept, Reject, Start Work, Mark Completed with final bill).
   - **Admin**: Moderate service listings, approve/reject offerings, manage user roles, audit bookings, and track platform revenue.
4. **Stripe Payment Gateway**:
   - Zero upfront payment policy.
   - Encrypted Stripe Checkout sessions with verified server-side final pricing.
5. **Shared Profile Management**:
   - Real-time profile photo updates via ImgBB without session logout.

## NPM Packages Used
- `next`: App Router framework
- `react` & `react-dom`: Component architecture
- `tailwindcss`: Utility-first CSS engine
- `lucide-react`: Modern icon system
- `sonner`: Toast notifications
- `@stripe/stripe-js`: Client-side Stripe checkout handling
- `clsx` & `tailwind-merge`: Dynamic style merging

## Client Environment Setup (.env.local)
```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
NEXT_PUBLIC_IMGBB_API_KEY=your_imgbb_key
```
