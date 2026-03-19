import { useEffect } from 'react'
import { useQuery } from '@tanstack/react-query'
import { TodoMap } from '@widgets/todo-map'
import { TodoCreateForm } from '@features/todo-create'
import { TodoCard, todoApi, useTodoStore } from '@entities/todo'

export function PlannerPage() {
  const setTodos = useTodoStore((s) => s.setTodos)
  const todos = useTodoStore((s) => s.todos)

  const { data, isLoading, error } = useQuery({
    queryKey: ['todos'],
    queryFn: todoApi.getAll,
  })

  useEffect(() => {
    if (Array.isArray(data)) {
      setTodos(data)
    }
  }, [data, setTodos])

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <aside className="flex w-80 flex-col gap-4 overflow-y-auto border-r p-4">
        <h1 className="text-xl font-bold">Gardener Planner</h1>
        <TodoCreateForm />
        <hr />
        {isLoading && <p className="text-sm text-muted-foreground">Loading tasks…</p>}
        {error && <p className="text-sm text-red-500">Failed to load tasks. Create tasks to get started.</p>}
        <ul className="flex flex-col gap-2">
          {Array.isArray(todos) && todos.map((todo) => (
            <TodoCard key={todo.id} todo={todo} />
          ))}
        </ul>
      </aside>
      {/* Map */}
      <main className="flex-1">
        <TodoMap className="h-full w-full" />
      </main>
    </div>
  )
}
