# API Client Guide

This project includes a complete API client setup with React Query for data fetching, mock data for development, and example components.

## Quick Start

### Using API Hooks in Components

```tsx
import { useUsers, useTodos } from '@shared/api/hooks'

export function MyComponent() {
  const { data: users, isLoading, error } = useUsers()

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error: {error.message}</div>

  return (
    <div>
      {users?.map(user => (
        <div key={user.id}>{user.name}</div>
      ))}
    </div>
  )
}
```

### Mutations (Create, Update, Delete)

```tsx
import { useCreateTodo, useUpdateTodo, useToggleTodo } from '@shared/api/hooks'

export function TodoForm() {
  const createTodo = useCreateTodo()
  const updateTodo = useUpdateTodo()
  const toggleTodo = useToggleTodo()

  const handleCreate = async () => {
    await createTodo.mutateAsync({
      title: 'New Todo',
      completed: false,
      userId: '1',
    })
  }

  const handleUpdate = async () => {
    await updateTodo.mutateAsync({
      id: '1',
      todo: { title: 'Updated Title' },
    })
  }

  return (
    <div>
      <button onClick={handleCreate} disabled={createTodo.isPending}>
        Create
      </button>
      <button onClick={handleUpdate} disabled={updateTodo.isPending}>
        Update
      </button>
    </div>
  )
}
```

## Architecture

### File Structure

```
shared/api/
├── client.ts              # Axios instance with interceptors
├── mock-data.ts           # TypeScript types and sample data
├── mock-interceptor.ts    # Mock API interceptor for development
├── services.ts            # API service methods (CRUD)
├── hooks.ts               # React Query hooks
├── services.test.ts       # Service tests
└── mock-interceptor.test.ts

shared/ui/
├── UserList.tsx           # Example component fetching users
├── UserList.test.tsx      # Component tests
├── TodoList.tsx           # Example component with mutations
└── TodoList.test.tsx
```

### Available APIs

#### Users API

```tsx
import { usersApi } from '@shared/api/services'

// Query
const users = await usersApi.getAll()
const user = await usersApi.getById('1')

// Mutations
const newUser = await usersApi.create({ name, email })
const updated = await usersApi.update('1', { name })
await usersApi.delete('1')
```

#### Todos API

```tsx
import { todosApi } from '@shared/api/services'

// Query
const todos = await todosApi.getAll()
const todos = await todosApi.getByUser('userId')
const todo = await todosApi.getById('1')

// Mutations
const newTodo = await todosApi.create({ title, completed, userId })
const updated = await todosApi.update('1', { title })
const toggled = await todosApi.toggle('1')
await todosApi.delete('1')
```

## Using Mock API

For development without a backend server:

### Enable Mock API

In your main app setup:

```tsx
import { enableMockApi } from '@shared/api/mock-interceptor'

if (import.meta.env.DEV) {
  enableMockApi()
}
```

This will intercept all API requests and return mock data.

### Mock Data

Default mock data is in `mock-data.ts`:
- 3 mock users
- 4 mock todos

The mock interceptor supports all CRUD operations and stores changes in memory (they'll reset on page reload).

### Reset Mock Data

```tsx
import { resetMockData } from '@shared/api/mock-interceptor'

resetMockData() // Reset to initial state
```

## Configuration

### Base URL

Set via environment variable:

```env
VITE_API_BASE_URL=https://api.example.com
```

Defaults to `/api`

### Authentication

The API client automatically includes JWT tokens:

```tsx
// Token is automatically added to requests
const token = getToken()
if (token) {
  config.headers.Authorization = `Bearer ${token}`
}
```

### Error Handling

401 errors automatically clear the stored token:

```tsx
if (err.response?.status === 401) {
  removeToken()
}
```

## React Query Concepts

### Queries (Data Fetching)

```tsx
const { data, isLoading, error } = useUsers()
```

- Automatic caching (5 minutes by default)
- Automatic refetching on window focus
- Optimistic updates support

### Mutations (Write Operations)

```tsx
const mutation = useCreateTodo()

// Trigger mutation
mutation.mutate({ title: 'New' })

// Await completion
await mutation.mutateAsync({ title: 'New' })

// States
mutation.isPending   // true while request is in flight
mutation.isError     // true if request failed
mutation.data        // the response data
```

### Query Invalidation

Mutations automatically invalidate related queries:

```tsx
// When you create a todo, the todos list is refreshed
const createTodo = useCreateTodo()
```

## Best Practices

1. **Use hooks, not raw services** - React Query handles caching and updates
2. **Type your components** - Full TypeScript support with API types
3. **Error boundaries** - Catch and display API errors to users
4. **Loading states** - Show spinners while data loads
5. **Optimistic updates** - Update UI before server confirms (in mutations)
6. **Environment variables** - Configure API URLs via .env

## Example Components

See example implementations:
- `UserList.tsx` - Fetching and displaying data
- `TodoList.tsx` - Mutations and state updates

Both include loading, error, and empty states.

## Testing

### Mocking API Calls

```tsx
import { vi } from 'vitest'
import * as hooks from '@shared/api/hooks'

vi.mock('@shared/api/hooks', () => ({
  useUsers: vi.fn(),
}))

// In test
vi.mocked(hooks.useUsers).mockReturnValueOnce({
  data: mockUsers,
  isLoading: false,
  error: null,
})
```

### Testing Services

Services are tested with mocked axios:

```tsx
vi.mock('./client', () => ({
  apiClient: {
    get: vi.fn(),
    post: vi.fn(),
  },
}))
```

See `services.test.ts` for examples.

## Troubleshooting

### Queries not updating after mutations

Make sure the mutation uses `queryClient.invalidateQueries()`:

```tsx
const createTodo = useCreateTodo() // Already set up
```

### Mock API not intercepting requests

Check that `enableMockApi()` is called early in app initialization and that requests match the mock URL patterns.

### CORS errors

Set `VITE_API_BASE_URL` to a CORS-enabled backend or use mock API during development.
