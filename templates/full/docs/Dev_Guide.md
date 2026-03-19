## FSD Guideline
### Phase 1 – Entities – most stable layer 
Goal: Solid, reusable domain models

- `entities/todo`
  - `model/types.ts` — Zod schemas (`Todo`, `TodoDto`, `Location`) + transformers DTO → domain
  - `model/queries.ts` — `useTodos`, `useTodoDetail` (TanStack Query + factory keys: `todoKeys`)
  - `ui/` — `TodoStatusBadge.tsx`, `TodoMarker.tsx` (memoized)
- Rules
  - All data through Zod validation + type inference
  - Unified query keys factory
  - Unit test coverage ≥ 90% (schema, edge cases, location bounds)

### Phase 2 – Features – core business logic
Key slices (each with public API only – no cross-feature imports):
- `todo-create` — react-hook-form + Zod resolver
- `todo-edit`
- `todo-status-change` — optimistic updates + rollback (cancelQueries + setQueryData + onError)
- `route-plan` — call `/route` → ordered todos + polyline (keep decoding inside feature)
- `auth` — JWT + context (zustand/jotai preferred for client state)

Rules
- Mutations → TanStack Query + error boundary + toast
- Public API in `index.ts` only
- Tests: unit + integration (especially optimistic + failure paths)

### Phase 3 – Widgets – composite UI blocks

- `widgets/todo-list` — virtualized list (`@tanstack/react-virtual` or `react-window`) + status filters
- `widgets/todo-map` — `react-leaflet` v4+, lazy (`Suspense` + `React.lazy`), memoized markers/polyline, `useMapEvents`, cleanup effects

Rules
- Lazy + virtualized + memo

### Phase 4 – Pages & Routing

- `pages/planner` — tabs (List/Map) + “Plan Shortest Route” button
- `react-router v6` (file-based optional)
- Route guard (auth redirect)
- After planning: optimistic set ordered list + highlight polyline

### Phase 5 – App Infrastructure

- Providers: `QueryClient`, `Auth`, `Theme`
- Global: ErrorBoundary, Suspense fallback skeleton
- API: axios instance + JWT interceptor + 401 → logout
- Optional: `usePermission` hook (RBAC), global analytics

### Phase 6 – Quality & Hardening

- Tests: Vitest units + RTL components + Playwright E2E
- Perf: React.memo, Query cache tuning, map lazy
- Security: Zod + escaping, fine-grained permissions
- Quality: eslint-plugin-boundaries / dependency-cruiser (enforce FSD rules), coverage ≥ 85%

### Phase 7 – Deployment & Iteration

- Vite prod: code-split, image optimize
- CI/CD: lint → test → build → Vercel/Netlify / internal
- Monitoring: Sentry + TanStack Devtools
- Release: Changesets + semantic-release

### Mandatory Throughout – Enterprise Practices

- State split: server → TanStack Query (entities), client → Zustand/jotai (features)
- Architecture guard: Steiger / dependency-cruiser / eslint boundaries
- Design tokens: Tailwind + CSS vars