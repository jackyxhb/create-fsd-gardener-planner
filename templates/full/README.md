# FSD Gardener Planner Template

A Feature-Sliced Design React 18 + Vite + TypeScript project for building gardener planning applications with interactive maps.

## Architecture

This project follows **Feature-Sliced Design (FSD)**, a methodical approach to organizing code that scales with project complexity.

### Directory Structure

```
src/
├── app/              # Root layer: providers, routing, global setup
├── pages/            # Page-level components: full-screen views
├── widgets/          # Composite widgets: self-contained UI sections
├── features/         # Feature logic: user workflows (create, edit, filter)
├── entities/         # Domain models: business logic (Todo, Location, Route)
└── shared/           # Reusable utilities: API client, auth, helpers
```

### Import Rules (Strictly Enforced)

Layers can import from lower layers only:

```
app      → pages, shared
pages    → widgets, features, entities, shared
widgets  → features, entities, shared
features → entities, shared
entities → shared only
shared   → npm packages only
```

Never import from higher layers. This prevents circular dependencies and keeps code modular.

## Quick Start

### Prerequisites

- **Node.js** ≥ 18
- **pnpm** (or npm)

### Development

```bash
pnpm install
pnpm dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build & Deploy

```bash
pnpm build      # TypeScript check + Vite build
pnpm preview    # Preview production build locally
```

## Available Scripts

| Command | Purpose |
|---------|---------|
| `pnpm dev` | Start Vite dev server |
| `pnpm build` | Build for production |
| `pnpm preview` | Preview prod build |
| `pnpm lint` | Run ESLint |
| `pnpm format` | Format code with Prettier |
| `pnpm test` | Run Vitest unit tests |

## Tech Stack

- **React 18** — UI framework
- **Vite 5** — Fast build tool
- **TypeScript** — Type safety (strict mode)
- **TanStack Query v5** — Server state & caching
- **Zustand** — Client state management
- **react-hook-form + Zod** — Form handling & validation
- **Tailwind CSS** — Utility-first styling
- **react-leaflet + Leaflet** — Interactive maps
- **Axios** — HTTP client with JWT interceptors
- **React Router v6** — Client-side routing
- **ESLint + Prettier** — Code quality
- **Vitest** — Unit testing

## Key Features

✨ **Complete project structure** — All files organized by FSD layer
🔐 **JWT authentication** — Automatic token management and 401 handling
📊 **Query caching** — Optimized data fetching with stale-time defaults
🗺️ **Map integration** — Leaflet pre-configured with icon fix for Vite
✅ **Form validation** — Zod schemas with react-hook-form integration
📱 **Responsive design** — Tailwind CSS for mobile-first styling
🧪 **Testing setup** — Vitest + @testing-library configured

## Project Layout Example

### Creating a New Feature

1. **Define entity** (`entities/garden/`): Domain model + API
2. **Add feature** (`features/garden-edit/`): User interaction logic
3. **Build widget** (`widgets/garden-form/`): Composite UI
4. **Wire in page** (`pages/gardens/`): Page layout

### Barrel Exports

Each FSD layer uses barrel exports (`index.ts`) for clean imports:

```tsx
// ✅ Good: imports from barrel
import { TodoCard, useTodoStore, todoApi } from '@entities/todo'

// ❌ Bad: deep imports
import { TodoCard } from '@entities/todo/ui/TodoCard'
```

## API & Backend Setup

### Mock API (Development)

By default, the app uses a **mock API** for development. This means:
- ✅ Works immediately without a backend
- ✅ Perfect for prototyping and demos
- ❌ Data is lost on page refresh

### Real Backend (Production)

To connect to your own backend API:

1. Update the API client in `src/entities/todo/api/todoApi.ts`
2. Set your API base URL in `.env.local`
3. Implement the required endpoints

**See [Backend Setup Guide](./docs/BACKEND_SETUP.md) for detailed instructions and example implementations.**

### Environment Variables

Create `.env.local` (ignored by git):

```env
VITE_API_BASE_URL=http://localhost:3000/api
```

The API client reads this for baseURL configuration.

## Useful Links

- [Feature-Sliced Design docs](https://feature-sliced.dev)
- [React docs](https://react.dev)
- [Vite docs](https://vitejs.dev)
- [TypeScript docs](https://www.typescriptlang.org)

## License

MIT
