/**
 * Example component: Todo List
 * Demonstrates fetching, updating, and deleting data using React Query hooks
 */

import { useTodos, useToggleTodo, useDeleteTodo } from '@shared/api/hooks'
import { Loader2, Trash2 } from 'lucide-react'

export function TodoList() {
  const { data: todos, isLoading, error } = useTodos()
  const toggleTodo = useToggleTodo()
  const deleteTodo = useDeleteTodo()

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-6 w-6 animate-spin text-blue-600" />
      </div>
    )
  }

  if (error) {
    return (
      <div className="rounded-md bg-red-50 p-4">
        <p className="text-sm text-red-800">
          Error loading todos: {error instanceof Error ? error.message : 'Unknown error'}
        </p>
      </div>
    )
  }

  if (!todos || todos.length === 0) {
    return <p className="text-gray-500">No todos found</p>
  }

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Tasks</h3>
      <div className="space-y-2">
        {todos.map((todo) => (
          <div
            key={todo.id}
            className="flex items-start gap-3 rounded-lg border border-gray-200 p-4"
          >
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => toggleTodo.mutate(todo.id)}
              disabled={toggleTodo.isPending}
              className="mt-1 h-5 w-5 rounded border-gray-300"
            />
            <div className="flex-1">
              <h4
                className={`font-medium ${
                  todo.completed ? 'line-through text-gray-400' : 'text-gray-900'
                }`}
              >
                {todo.title}
              </h4>
              {todo.description && (
                <p className="mt-1 text-sm text-gray-600">{todo.description}</p>
              )}
              <p className="mt-2 text-xs text-gray-500">
                {new Date(todo.createdAt).toLocaleDateString()}
              </p>
            </div>
            <button
              onClick={() => deleteTodo.mutate(todo.id)}
              disabled={deleteTodo.isPending}
              className="text-gray-400 hover:text-red-600 disabled:opacity-50"
              aria-label="Delete todo"
            >
              <Trash2 className="h-5 w-5" />
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
