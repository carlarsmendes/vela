# Vela

Vela is a minimal cycle-aware training companion for people who want a calmer way to track their cycle, body metrics, and training context over time.

## V1 Scope

The current V1 foundation focuses on:

- email/password auth structure with Supabase
- password recovery flow
- onboarding for average cycle length and training focus
- a body metrics direction that includes weight, waist, hips, bust / chest, thigh, arm, neck, body fat %, and optional notes
- starter dashboard and app layout for future tracking flows

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
- The onboarding flow is currently saved in local storage as a temporary bridge until user profile persistence is added.

## Current Product State

- homepage and base app shell are in place
- signup and login are wired to Supabase
- forgot-password and reset-password flows are wired to Supabase
- onboarding collects average cycle length and preferred training focus
- onboarding introduces the V1 body metrics set
- dashboard is still a placeholder, ready for real tracked data
- authenticated state is visible in the header

## Project Structure

- `app/` routes, server actions, and auth callback handler
- `components/` reusable UI pieces
- `lib/` shared config, onboarding helpers, and Supabase clients
- `types/` shared TypeScript types

## Next Steps

- connect onboarding data to authenticated user profiles
- add the first `body_entries` table and save flow
- add protected dashboard behavior once auth is fully configured
- begin logging flows for weight, measurements, and period start dates
