# Backend (Express + Supabase)

REST API responsible for authentication, user profiles, dashboard stats, course retrieval, and certificate history—everything backed by Supabase (PostgreSQL).

## Setup

1. Create a Supabase project and grab `SUPABASE_URL`, `SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY`.
2. Copy `env.example` to `.env` inside this directory and fill in the values (port defaults to 4000).
3. Install dependencies and start the dev server:

```powershell
cd Backend
npm install
npm run dev
```

The server automatically calls the `create_profiles_table_if_not_exists` RPC (see root README for SQL) on boot. Ensure you run that SQL once inside Supabase.

## Available Endpoints

| Method | Path | Description |
| --- | --- | --- |
| `POST` | `/auth/signup` | Creates a Supabase user + profile row (`firstName`, `lastName`). |
| `POST` | `/auth/login` | Exchanges credentials for a Supabase session (returns access token + profile details). |
| `GET` | `/users/me/overview` | Aggregates profile stats, active enrollments, certificates, and wishlist recommendations. |
| `GET` | `/users/me/courses` | Returns every enrollment with progress, ETA, and course metadata. |
| `GET` | `/users/me/certificates` | Lists issued certificates with credential IDs, badge URLs, and links. |

All `/users/*` routes require an `Authorization: Bearer <access_token>` header (token received from `/auth/login`). Tokens are verified against Supabase using the anon key.

## Data Model

Expected tables (all `uuid` primary keys, RLS enabled with policies scoped to `auth.uid()`):

- `profiles` – at least `id`, `first_name`, `last_name`, `avatar_url`, `role`, `organization`, `xp`, `badges text[]`.
- `courses` – `title`, `category`, `level`, `duration_minutes`, `lessons_count`, `thumbnail_url`, `instructor`, `rating`.
- `enrollments` – `user_id`, `course_id`, `status`, `progress`, `last_lesson`, `last_accessed_at`, `completion_eta`.
- `certificates` – `user_id`, `course_id`, `credential_id`, `issued_on`, `badge_url`, `certificate_url`, `hours`, `grade`.

## Security Notes

- The Supabase service-role key is only used server-side for privileged operations (user creation, profile insert). Never expose it to the frontend.
- Use HTTPS + stricter CORS in production (`cors({ origin: ['https://yourdomain.com'] })`).
- Consider wiring Supabase Row Level Security policies to match your business logic before launching publicly.
