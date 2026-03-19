import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import type { Todo } from './types'

interface TodoStore {
  todos: Todo[]
  selectedId: string | null
  setTodos: (todos: Todo[]) => void
  addTodo: (todo: Todo) => void
  updateTodo: (id: string, patch: Partial<Todo>) => void
  removeTodo: (id: string) => void
  selectTodo: (id: string | null) => void
}

export const useTodoStore = create<TodoStore>()(
  devtools((set) => ({
    todos: [],
    selectedId: null,
    setTodos: (todos) => set({ todos }),
    addTodo: (todo) => set((s) => ({ todos: [...s.todos, todo] })),
    updateTodo: (id, patch) =>
      set((s) => ({ todos: s.todos.map((t) => (t.id === id ? { ...t, ...patch } : t)) })),
    removeTodo: (id) => set((s) => ({ todos: s.todos.filter((t) => t.id !== id) })),
    selectTodo: (selectedId) => set({ selectedId }),
  })),
)
