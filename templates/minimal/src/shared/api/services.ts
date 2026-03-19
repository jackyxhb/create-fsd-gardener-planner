/**
 * API Service methods
 * Handles all API calls with proper typing and error handling
 */

import { apiClient } from './client'
import type { User, Todo, ApiResponse } from './mock-data'

// === Users API ===
export const usersApi = {
  /**
   * Fetch all users
   */
  getAll: async (): Promise<User[]> => {
    const { data } = await apiClient.get<ApiResponse<User[]>>('/users')
    return data.data
  },

  /**
   * Fetch a single user by ID
   */
  getById: async (id: string): Promise<User> => {
    const { data } = await apiClient.get<ApiResponse<User>>(`/users/${id}`)
    return data.data
  },

  /**
   * Create a new user
   */
  create: async (user: Omit<User, 'id' | 'createdAt'>): Promise<User> => {
    const { data } = await apiClient.post<ApiResponse<User>>('/users', user)
    return data.data
  },

  /**
   * Update a user
   */
  update: async (id: string, user: Partial<User>): Promise<User> => {
    const { data } = await apiClient.put<ApiResponse<User>>(`/users/${id}`, user)
    return data.data
  },

  /**
   * Delete a user
   */
  delete: async (id: string): Promise<void> => {
    await apiClient.delete(`/users/${id}`)
  },
}

// === Todos API ===
export const todosApi = {
  /**
   * Fetch all todos
   */
  getAll: async (): Promise<Todo[]> => {
    const { data } = await apiClient.get<ApiResponse<Todo[]>>('/todos')
    return data.data
  },

  /**
   * Fetch todos for a specific user
   */
  getByUser: async (userId: string): Promise<Todo[]> => {
    const { data } = await apiClient.get<ApiResponse<Todo[]>>('/todos', {
      params: { userId },
    })
    return data.data
  },

  /**
   * Fetch a single todo by ID
   */
  getById: async (id: string): Promise<Todo> => {
    const { data } = await apiClient.get<ApiResponse<Todo>>(`/todos/${id}`)
    return data.data
  },

  /**
   * Create a new todo
   */
  create: async (todo: Omit<Todo, 'id' | 'createdAt' | 'updatedAt'>): Promise<Todo> => {
    const { data } = await apiClient.post<ApiResponse<Todo>>('/todos', todo)
    return data.data
  },

  /**
   * Update a todo
   */
  update: async (id: string, todo: Partial<Todo>): Promise<Todo> => {
    const { data } = await apiClient.put<ApiResponse<Todo>>(`/todos/${id}`, todo)
    return data.data
  },

  /**
   * Toggle todo completion status
   */
  toggle: async (id: string): Promise<Todo> => {
    const { data } = await apiClient.patch<ApiResponse<Todo>>(`/todos/${id}/toggle`, {})
    return data.data
  },

  /**
   * Delete a todo
   */
  delete: async (id: string): Promise<void> => {
    await apiClient.delete(`/todos/${id}`)
  },
}
