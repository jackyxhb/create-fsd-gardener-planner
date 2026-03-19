/**
 * API module exports
 * Central export point for all API utilities
 */

// Client
export { apiClient } from './client'

// Data types and mock data
export { MOCK_USERS, MOCK_TODOS } from './mock-data'
export type { User, Todo, ApiResponse } from './mock-data'

// Services
export { usersApi, todosApi } from './services'

// Hooks
export {
  // Users
  useUsers,
  useUser,
  useCreateUser,
  useUpdateUser,
  useDeleteUser,
  // Todos
  useTodos,
  useTodosByUser,
  useTodo,
  useCreateTodo,
  useUpdateTodo,
  useToggleTodo,
  useDeleteTodo,
} from './hooks'

// Mock API
export { enableMockApi, resetMockData } from './mock-interceptor'
