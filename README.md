# create-fsd-gardener-planner

A CLI scaffolder for Feature-Sliced Design React 18 + Vite + TypeScript projects with a gardener/todo-map theme.

## Prerequisites

- **Node.js** ≥ 18
- **pnpm** (npm fallback available)

## Usage

```bash
npx create-fsd-gardener-planner@latest my-app
cd my-app
pnpm dev
```

## What's Included

✨ **Complete FSD Architecture**
- 6 layers: `app` → `pages` → `widgets` → `features` → `entities` → `shared`
- Barrel exports for clean imports
- Path aliases (`@app`, `@pages`, `@widgets`, `@features`, `@entities`, `@shared`)

📦 **Tech Stack**
- React 18 + Vite 5 + TypeScript (strict mode)
- TanStack Query v5 (data fetching/caching)
- Zustand v4 (state management)
- react-hook-form + Zod (forms + validation)
- Tailwind CSS v3 + shadcn/ui patterns
- react-leaflet + Leaflet (maps)
- React Router v6 (routing)
- Axios (HTTP client with JWT interceptors)

⚙️ **Dev Tools**
- ESLint + Prettier (linting & formatting)
- Vitest (unit testing)
- Strict TypeScript configuration

## Project Structure

```
src/
├── app/              # Root, providers (Query, Auth), router
├── pages/            # Page-level components (PlannerPage)
├── widgets/          # Composite UI widgets (TodoMap)
├── features/         # Feature logic (TodoCreate form)
├── entities/         # Domain models (Todo, Location, Route)
└── shared/           # Utilities, API client, auth helpers
```

## Available Scripts

```bash
pnpm dev       # Start dev server (localhost:5173)
pnpm build     # Build for production
pnpm preview   # Preview production build
pnpm lint      # Run ESLint
pnpm format    # Format code with Prettier
pnpm test      # Run Vitest
```

## FSD Import Rules

Layers can only import from lower layers:
- `app` → `pages`, `shared`
- `pages` → `widgets`, `features`, `entities`, `shared`
- `widgets` → `features`, `entities`, `shared`
- `features` → `entities`, `shared`
- `entities` → `shared` only
- `shared` → npm packages only

## Next Steps

1. Update `VITE_API_BASE_URL` in `.env.local` to your API endpoint
2. Implement real Todo API endpoints (currently stubbed)
3. Customize Tailwind theme and components
4. Add more features following the FSD pattern

## License

MIT
