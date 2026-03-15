# Vela

Vela is a minimal cycle-aware training companion for people who want a calmer way to track their cycle, body metrics, and training context over time.

## Current Scope

The current Vela foundation focuses on:

- email/password auth structure with Supabase
- password recovery flow
- persisted onboarding for average cycle length and training focus
- first body metrics entry flow with date, optional metrics, and optional note
- dashboard with profile summary and recent body entries

Not in scope yet:

- charts
- CSV export
- prediction logic
- recommendation logic
- finished database integration

## Stack

- Next.js App Router
- TypeScript
- Tailwind CSS
- Supabase

## Local Development

1. Install dependencies

```bash
npm install
```

2. Create a local env file

```bash
cp .env.example .env.local
```

3. Add your Supabase values to `.env.local`

```bash
NEXT_PUBLIC_SUPABASE_URL=your-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

4. Start the app

```bash
npm run dev
```

5. Open `http://localhost:3000`

## Environment Variables

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`

## Current App Routes

- `/`
- `/login`
- `/signup`
- `/forgot-password`
- `/reset-password`
- `/onboarding`
- `/dashboard`
- `/auth/error`

## Auth Foundation Notes

- Supabase auth is wired for email/password flows.
- The signup flow uses `/auth/callback` for email confirmation redirects.
- The password recovery flow sends users through `/auth/callback` and into `/reset-password`.
- The header now reflects auth state: logged-out users see `Log in` and `Sign up`, while logged-in users see their email and a `Log out` action.
- Onboarding and body entries now persist to Supabase after the required tables are created.
- The SQL setup for `profiles` and `body_entries` lives in `supabase/schema.sql`.

## Current Product State

- homepage and base app shell are in place
- signup and login are wired to Supabase
- forgot-password and reset-password flows are wired to Supabase
- onboarding saves average cycle length and preferred training focus to Supabase
- users can create body entries with one or more metrics plus an optional note
- dashboard shows saved profile details and recent body entries
- authenticated state is visible in the header

## Supabase Setup

Before persisted onboarding and body entries can work, run the SQL in:

- `supabase/schema.sql`

Run it in the Supabase SQL editor for your project. This creates:

- `profiles`
- `body_entries`
- row-level security policies for both tables
- the `updated_at` trigger for `profiles`

## Project Structure

- `app/` routes, server actions, and auth callback handler
- `components/` reusable UI pieces
- `lib/` shared config, onboarding helpers, and Supabase clients
- `types/` shared TypeScript types

## Next Steps

- add edit and delete support for body entries
- add period start logging and the first cycle-history view
- connect onboarding completion to routing decisions
- begin trend views for weight and measurement history
