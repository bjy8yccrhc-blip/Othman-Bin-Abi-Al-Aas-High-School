# موقع المدرسة (School Website)

A bilingual-friendly Arabic (RTL) school website with public pages and an admin panel for content management.

## Stack
- **Monorepo**: pnpm workspace
- **Frontend**: React + Vite (artifact: `school-website`, slug `/`)
- **Backend**: Express 5 + TypeScript (artifact: `api-server`, mounted at `/api`)
- **Database**: PostgreSQL via Drizzle ORM
- **Auth**: Replit-managed Clerk (with Arabic localization, branded sign-in/up)
- **API contract**: OpenAPI → generated Zod schemas + react-query hooks

## Pages
- `/` — الرئيسية (Home): hero, stats, recent activity, upcoming activities
- `/about` — نبذة عن المدرسة: history, mission, vision, principal, contact
- `/resources` — المصادر التعليمية: searchable/filterable resource list
- `/newspaper` + `/newspaper/:id` — صحيفة المدرسة
- `/activities` — أنشطة المدرسة (upcoming + past)
- `/sign-in`, `/sign-up` — Clerk auth pages (Arabic)
- `/admin` — لوحة المشرف (admin-only CRUD for all content)

## Roles
- First user to sign in becomes **admin** automatically.
- All other users default to **user** (view-only).
- Role is stored in the local `users` table keyed by Clerk userId.
- Server enforces admin via `requireAdmin` middleware on all write endpoints.

## API endpoints
- `GET /api/me` — returns current user info + role
- `GET/POST /api/resources`, `/categories`, `GET/PATCH/DELETE /api/resources/:id`
- `GET/POST /api/newspaper`, `GET/PATCH/DELETE /api/newspaper/:id`
- `GET/POST /api/activities`, `/upcoming`, `GET/PATCH/DELETE /api/activities/:id`
- `GET/PUT /api/about` (single record, auto-seeded with default Arabic content)
- `GET /api/stats`, `GET /api/recent-activity`

## Key files
- `lib/api-spec/openapi.yaml` — API contract
- `lib/db/src/schema/` — Drizzle schemas
- `artifacts/api-server/src/routes/` — route handlers
- `artifacts/api-server/src/lib/auth.ts` — auth middleware + first-user-becomes-admin logic
- `artifacts/school-website/src/App.tsx` — Clerk wiring + routing
