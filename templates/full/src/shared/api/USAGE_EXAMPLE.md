# API Client Usage Examples

Quick copy-paste examples for common patterns.

## Setup: Enable Mock API

In your `main.tsx` or app initialization:

```tsx
import { enableMockApi } from '@shared/api'

// Enable mock API for development
if (import.meta.env.DEV) {
  enableMockApi()
  console.log('Mock API enabled - using mock data')
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
```

## Example: Simple Data Display

```tsx
import { useUsers } from '@shared/api'
import { Loader2 } from 'lucide-react'

export function UsersList() {
  const { data: users, isLoading, error } = useUsers()

  if (isLoading) return <Loader2 className="animate-spin" />
  if (error) return <div>Error: {error.message}</div>
  if (!users?.length) return <p>No users found</p>

  return (
    <ul>
      {users.map(user => (
        <li key={user.id}>{user.name} ({user.email})</li>
      ))}
    </ul>
  )
}
```

## Example: Create Form

```tsx
import { useCreateTodo } from '@shared/api'
import { useState } from 'react'

export function CreateTodoForm() {
  const [title, setTitle] = useState('')
  const createTodo = useCreateTodo()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await createTodo.mutateAsync({
      title,
      completed: false,
      userId: '1',
    })
    setTitle('') // Reset form
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="New todo..."
        disabled={createTodo.isPending}
      />
      <button disabled={createTodo.isPending}>
        {createTodo.isPending ? 'Adding...' : 'Add'}
      </button>
      {createTodo.error && (
        <p className="text-red-600">{createTodo.error.message}</p>
      )}
    </form>
  )
}
```

## Example: List with Mutations

```tsx
import { useTodos, useToggleTodo, useDeleteTodo } from '@shared/api'
import { Trash2 } from 'lucide-react'

export function TodosList() {
  const { data: todos, isLoading } = useTodos()
  const toggleTodo = useToggleTodo()
  const deleteTodo = useDeleteTodo()

  if (isLoading) return <p>Loading...</p>

  return (
    <div className="space-y-2">
      {todos?.map(todo => (
        <div key={todo.id} className="flex items-center gap-3 p-2 border rounded">
          <input
            type="checkbox"
            checked={todo.completed}
            onChange={() => toggleTodo.mutate(todo.id)}
            disabled={toggleTodo.isPending}
          />
          <span className={todo.completed ? 'line-through text-gray-400' : ''}>
            {todo.title}
          </span>
          <button
            onClick={() => deleteTodo.mutate(todo.id)}
            disabled={deleteTodo.isPending}
            className="ml-auto"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      ))}
    </div>
  )
}
```

## Example: Using Services Directly

For non-React code or when you need direct control:

```tsx
import { usersApi, todosApi } from '@shared/api'

// Fetch data
const users = await usersApi.getAll()
const user = await usersApi.getById('1')

// Create
const newUser = await usersApi.create({
  name: 'John Doe',
  email: 'john@example.com',
})

// Update
const updated = await usersApi.update('1', {
  name: 'Jane Doe',
})

// Delete
await usersApi.delete('1')
```

## Example: Error Handling

```tsx
import { useTodos } from '@shared/api'
import { AlertCircle } from 'lucide-react'

export function TodosWithErrors() {
  const { data: todos, error, isError } = useTodos()

  if (isError) {
    const message = error instanceof Error ? error.message : 'Unknown error'
    return (
      <div className="flex gap-2 rounded bg-red-50 p-4 text-red-900">
        <AlertCircle className="h-5 w-5 flex-shrink-0" />
        <div>
          <h3 className="font-semibold">Failed to load todos</h3>
          <p className="text-sm">{message}</p>
        </div>
      </div>
    )
  }

  return (
    <div>
      {todos?.map(todo => (
        <div key={todo.id}>{todo.title}</div>
      ))}
    </div>
  )
}
```

## Example: Pagination

While not built-in, you can add pagination with React Query:

```tsx
import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import { usersApi } from '@shared/api'

export function PaginatedUsers() {
  const [page, setPage] = useState(1)
  const pageSize = 10

  const { data: allUsers } = useUsers()
  const paginatedUsers = allUsers?.slice(
    (page - 1) * pageSize,
    page * pageSize
  )

  return (
    <div>
      {paginatedUsers?.map(user => (
        <div key={user.id}>{user.name}</div>
      ))}
      <button onClick={() => setPage(p => p - 1)} disabled={page === 1}>
        Prev
      </button>
      <button
        onClick={() => setPage(p => p + 1)}
        disabled={!allUsers || paginatedUsers!.length < pageSize}
      >
        Next
      </button>
    </div>
  )
}
```

## Example: Optimistic Updates

```tsx
import { useUpdateTodo } from '@shared/api'

export function TodoItem({ todo }) {
  const updateTodo = useUpdateTodo()

  const handleToggle = () => {
    // Optimistic update is handled by React Query
    updateTodo.mutate({
      id: todo.id,
      todo: { completed: !todo.completed },
    })
  }

  return (
    <input
      type="checkbox"
      checked={todo.completed}
      onChange={handleToggle}
      disabled={updateTodo.isPending}
    />
  )
}
```

## Example: Dependent Queries

Fetch todos only after getting the user:

```tsx
import { useUser, useTodosByUser } from '@shared/api'

export function UserTodos({ userId }: { userId: string }) {
  const { data: user } = useUser(userId)
  const { data: todos, isLoading } = useTodosByUser(userId)

  if (!user) return <p>User not found</p>
  if (isLoading) return <p>Loading todos...</p>

  return (
    <div>
      <h2>{user.name}'s Todos</h2>
      {todos?.map(todo => (
        <div key={todo.id}>{todo.title}</div>
      ))}
    </div>
  )
}
```

## Tips

1. **Use hooks in components** - They handle caching, updates, and errors
2. **Check `isPending`** - Disable buttons/inputs while request is in flight
3. **Handle errors** - Show error messages to users
4. **Use optimistic updates** - Mutations pre-configure this
5. **Test with mock API** - Call `enableMockApi()` in tests if needed
6. **Environment setup** - Configure `VITE_API_BASE_URL` for different backends

## Common Patterns

### Check if data exists before rendering

```tsx
if (!data?.length) return <p>No data</p>
```

### Show loading skeleton

```tsx
if (isLoading) return <TodoSkeleton />
```

### Disable input while loading

```tsx
<input disabled={isLoading || isPending} />
```

### Refetch on demand

```tsx
const { refetch } = useUsers()
<button onClick={() => refetch()}>Refresh</button>
```

### Clear cache

```tsx
import { useQueryClient } from '@tanstack/react-query'

const queryClient = useQueryClient()
queryClient.invalidateQueries({ queryKey: ['users'] })
```
