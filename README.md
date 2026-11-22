# Fixura - Smart Device & Home Appliance Restoration Platform

Fixura is an on-demand, role-based repair service booking platform built with Next.js (App Router), Tailwind CSS, Express, MongoDB, and Stripe.

## Project Purpose
In Bangladesh and worldwide, individuals struggle to find trustworthy repair technicians. Customers often lack visibility into what happens after handing over expensive devices and face arbitrary charges before work is verified. Fixura addresses this with a strict role-based status pipeline (Requested → Accepted → In Progress → Completed) and a pay-after-service guarantee where Stripe payment is unlocked only after repair completion.

## Live Application & Repositories
- **Live Site**: https://fix-mate-client-three.vercel.app
- **Client Repository**: https://github.com/niaz404/FixMate-client
- **Server Repository**: https://github.com/niaz404/Fixmate-server
- **Backend API**: https://fixmate-server-bn2p.onrender.com

## Credentials for Testing
- **Administrator**:
  - Email: `admin@fixura.com`
  - Password: `Admin123!`
- **Technician**:
  - Email: `tech@fixura.com`
  - Password: `Tech123!`
- **Customer**:
  - Email: `customer@fixura.com`
  - Password: `Cust123!`

## Key Platform Features
1. **10-Section Landing Page Design**:
   - Soft `#dde6f0` canvas with `#d5dde7` subtle section grounds, `#000000` headings, and `#1e3a8a` royal blue accents.
   - Hero section, verified brand clouds, 3 alternating feature rows, 3-step process protocol, live customer reviews from MongoDB, 3-tier pricing, 6-item interactive FAQ accordion, and closing CTA.
2. **Server-Side Search, Filter & Sort**:
   - Search by problem keyword or title, filter by category or service mode (Home Visit / Shop Drop-off), and sort by price or newest.
   - URL query parameter state persistence across reloads.
3. **Role-Based Portals & Pipelines**:
   - **Customer**: Manage requests, cancel bookings while pending, pay verified completed jobs with Stripe, view receipts.
   - **Technician**: Add repair listings, full CRUD catalog with availability toggle, status transitions (Accept, Reject, Start Work, Mark Completed with final bill).
   - **Admin**: Moderate service listings, approve/reject offerings, manage user roles, audit bookings, and track platform revenue.
4. **Stripe Payment Gateway**:
   - Zero upfront payment policy.
   - Stripe Checkout sessions with verified server-side final pricing.
5. **Shared Profile Management**:
   - Real-time profile updates without session logout.

## NPM Packages Used
- `next`: App Router framework
- `react` & `react-dom`: Component architecture
- `tailwindcss`: Utility-first CSS engine
- `lucide-react`: Modern icon system
- `sonner`: Toast notifications
- `@stripe/stripe-js`: Client-side Stripe checkout handling
- `stripe`: Server-side Stripe SDK
- `better-auth`: Authentication framework
- `@better-auth/mongo-adapter`: MongoDB adapter for BetterAuth
- `mongodb`: MongoDB native driver
- `clsx` & `tailwind-merge`: Dynamic style utilities
