# TechZone LMS

A modern learning management experience built with a Vite + React frontend, an Express + Supabase backend, and Tailwind-powered UI components.

## Features

- Supabase-authenticated login & signup (service-role powered onboarding flow).
- Personalized dashboard with live stats, active courses, recommendations, and certificate highlights.
- Dedicated **My Courses** and **My Certificates** spaces that read directly from Supabase (PostgreSQL) tables.
- Reusable API client with automatic token injection and Zustand-based session persistence.

## Getting Started

### Prerequisites

- Node.js 18+
- Supabase project with the following environment variables:
  - `SUPABASE_URL`
  - `SUPABASE_ANON_KEY`
  - `SUPABASE_SERVICE_ROLE_KEY`

### 1. Backend

```powershell
cd Backend
cp env.example .env   # Fill in Supabase values & optional PORT
npm install
npm run dev
```

Key endpoints

- `POST /auth/signup` – creates a confirmed user + profile row.
- `POST /auth/login` – returns the Supabase session/token plus profile metadata.
- `GET /users/me/overview` – aggregates dashboard stats, active courses, certificates, recommendations.
- `GET /users/me/courses` – returns the learner’s enrollments with progress metadata.
- `GET /users/me/certificates` – lists all issued certificates.

### 2. Frontend

```powershell
cd Frontend
cp env.example .env   # Set VITE_API_URL=http://localhost:4000 or your deployed URL
npm install
npm run dev
```

### Supabase Schema Essentials

Create the following helper function inside Supabase so the backend can ensure the `profiles` table exists:

```sql
create or replace function public.create_profiles_table_if_not_exists()
returns void
language plpgsql
security definer
set search_path = public
as $$
begin
  if not exists (
    select from pg_catalog.pg_tables
    where schemaname = 'public'
      and tablename = 'profiles'
  ) then
    create table if not exists public.profiles (
      id uuid primary key references auth.users(id) on delete cascade,
      first_name text,
      last_name text,
      avatar_url text,
      role text default 'Student',
      organization text,
      xp int default 0,
      badges text[]
    );
    alter table public.profiles enable row level security;
  end if;
end;
$$;
```

Recommended relational tables (all with RLS enabled):

- `courses` – metadata for each course (`title`, `category`, `level`, `duration_minutes`, `lessons_count`, `thumbnail_url`, `instructor`, `rating`).
- `enrollments` – `user_id`, `course_id`, `status` (`in_progress`, `completed`, `wishlist`), `progress`, `last_lesson`, `last_accessed_at`, `completion_eta`.
- `certificates` – `user_id`, `course_id`, `credential_id`, `issued_on`, `badge_url`, `certificate_url`, `hours`, `grade`.

Seed these tables with a few rows per user to see the dashboard/cards populate immediately.

## Deployment notes

- Frontend reads `VITE_API_URL` at build time; point it to your deployed backend.
- Never expose `SUPABASE_SERVICE_ROLE_KEY` to the browser—keep the backend as the sole consumer.
- Add HTTPS + domain-specific CORS restrictions before production.

Happy building! 🎓
