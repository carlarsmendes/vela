# Vela

Vela is a minimal, cycle-aware training companion. This first version focuses on the project foundation: a calm mobile-first interface, onboarding for average cycle length, and starter routes for auth and future tracking workflows.

## Stack

- Next.js with App Router and TypeScript
- Tailwind CSS
- Supabase for future auth and database integration

## Project Structure

- `app/` application routes and layout
- `components/` reusable UI building blocks
- `lib/` shared helpers, including Supabase client setup
- `types/` shared TypeScript types

## Run Locally

1. Install dependencies:

```bash
npm install
```

2. Copy the example environment file:

```bash
cp .env.example .env.local
```

3. Start the development server:

```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000)

## Environment Variables

These are not used deeply yet, but Vela will need them when Supabase auth and persistence are added:

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`

## Current Scope

This foundation includes:

- a shared layout and homepage
- placeholder routes for login, signup, onboarding, and dashboard
- a starter onboarding form for average cycle length
- a dashboard shell with placeholder cards

Still to do next:

- real auth flows with Supabase
- database schema and persistence
- logging flows for metrics and period dates
- charts, predictions, and training guidance
