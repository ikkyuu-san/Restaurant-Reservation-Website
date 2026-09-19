# EMBER — Restaurant Reservation Website

EMBER is a premium modern European restaurant experience based in Bangkok. The project combines an editorial customer-facing website with a reservation flow and a Supabase-powered admin dashboard for managing bookings.

## Live Demo

[Visit the live EMBER website](https://restaurant-reservation-website-rmqn.vercel.app)

## Features

- Premium responsive restaurant homepage with Hero, About, Featured Dishes, and Menu sections
- Customer reservation form with client-side validation
- Supabase database integration for storing reservations
- Admin email/password authentication with Supabase Auth
- Protected admin dashboard for viewing reservations
- Reservation status management with Confirm and Cancel actions
- Loading, empty, validation, and error states
- Responsive layouts for desktop, tablet, and mobile

## Tech Stack

- React
- Vite
- Supabase
- Supabase Auth
- Supabase JavaScript client
- CSS

## Customer Reservations

Guests can submit their name, contact details, reservation date and time, guest count, and optional special requests. Valid reservations are inserted into the Supabase `reservations` table.

## Admin Dashboard

The project includes a protected `/admin` dashboard. Admin authentication is required before accessing reservation management tools. Authenticated admin users can view and manage reservations, including reviewing guest details and updating reservation statuses. The admin login is available at `/admin/login`.

## Local Development

### Prerequisites

- Node.js 18 or newer
- A Supabase project

### Setup

1. Install dependencies:

   ```bash
   npm install
   ```

2. Create a `.env` file in the project root using the placeholders below:

   ```env
   VITE_SUPABASE_URL=https://your-project-id.supabase.co
   VITE_SUPABASE_PUBLISHABLE_KEY=your-supabase-publishable-key
   ```

   Never commit real keys, passwords, or other secrets. The `.env` file is ignored by Git.

3. Start the development server:

   ```bash
   npm run dev
   ```

4. Open the local URL shown by Vite in your browser.

### Available Commands

```bash
npm run dev      # Start the development server
npm run lint     # Run Oxlint
npm run build    # Create a production build
npm run preview  # Preview the production build locally
```

## Future Improvements

- Add role-based admin permissions and stronger operational access controls
- Add reservation search, filters, pagination, and export tools
- Add email confirmations and reminders for guests
- Add availability rules and table capacity management
- Add analytics for bookings, guest counts, and popular dining times
- Add automated tests and end-to-end coverage
