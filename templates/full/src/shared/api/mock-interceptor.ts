/**
 * Mock API Interceptor
 * Intercepts API requests and returns mock data for development/testing
 * Enable with: enableMockApi()
 */

import type { AxiosError, AxiosResponse } from 'axios'
import { apiClient } from './client'
import { MOCK_USERS, MOCK_TODOS } from './mock-data'
import type { User, Todo, ApiResponse } from './mock-data'

// Store for mock data mutations
let mockUsers = [...MOCK_USERS]
let mockTodos = [...MOCK_TODOS]

/**
 * Enable mock API interceptor
 * Call this early in your app if you want to use mock data
 */
export function enableMockApi() {
  apiClient.interceptors.response.use(
    (response) => response,
    async (error: AxiosError) => {
      const config = error.config
      if (!config) return Promise.reject(error)

      const method = config.method?.toUpperCase()
      const url = config.url || ''

      // Users endpoints
      if (url.includes('/users')) {
        if (method === 'GET') {
          if (url.match(/\/users\/\d+$/)) {
            // Get single user
            const id = url.split('/').pop()
            const user = mockUsers.find((u) => u.id === id)
            if (user) {
              return Promise.resolve({
                data: { data: user, status: 'success' },
                status: 200,
                statusText: 'OK',
                headers: {},
                config,
              } as unknown as AxiosResponse)
            }
          } else {
            // Get all users
            return Promise.resolve({
              data: { data: mockUsers, status: 'success' },
              status: 200,
              statusText: 'OK',
              headers: {},
              config,
            } as unknown as AxiosResponse)
          }
        } else if (method === 'POST') {
          // Create user
          const newUser: User = {
            id: String(mockUsers.length + 1),
            ...(config.data as Omit<User, 'id'>),
            createdAt: new Date().toISOString(),
          }
          mockUsers.push(newUser)
          return Promise.resolve({
            data: { data: newUser, status: 'success' },
            status: 201,
            statusText: 'Created',
            headers: {},
            config,
          } as unknown as AxiosResponse)
        } else if (method === 'PUT') {
          // Update user
          const id = url.split('/').pop()
          const index = mockUsers.findIndex((u) => u.id === id)
          if (index !== -1) {
            mockUsers[index] = { ...mockUsers[index], ...(config.data as Partial<User>) }
            return Promise.resolve({
              data: { data: mockUsers[index], status: 'success' },
              status: 200,
              statusText: 'OK',
              headers: {},
              config,
            } as unknown as AxiosResponse)
          }
        } else if (method === 'DELETE') {
          // Delete user
          const id = url.split('/').pop()
          mockUsers = mockUsers.filter((u) => u.id !== id)
          return Promise.resolve({
            data: { status: 'success' },
            status: 204,
            statusText: 'No Content',
            headers: {},
            config,
          } as unknown as AxiosResponse)
        }
      }

      // Todos endpoints
      if (url.includes('/todos')) {
        if (method === 'GET') {
          if (url.includes('/todos') && !url.match(/\/todos\/[^/]+(?:\/|$)/)) {
            // Check if it's a list request with userId filter
            const params = new URLSearchParams(config.url?.split('?')[1] || '')
            const userId = params.get('userId')
            if (userId) {
              const todos = mockTodos.filter((t) => t.userId === userId)
              return Promise.resolve({
                data: { data: todos, status: 'success' },
                status: 200,
                statusText: 'OK',
                headers: {},
                config,
              } as unknown as AxiosResponse)
            } else {
              // Get all todos
              return Promise.resolve({
                data: { data: mockTodos, status: 'success' },
                status: 200,
                statusText: 'OK',
                headers: {},
                config,
              } as unknown as AxiosResponse)
            }
          } else if (url.match(/\/todos\/[^/]+$/)) {
            // Get single todo
            const id = url.split('/').pop()
            const todo = mockTodos.find((t) => t.id === id)
            if (todo) {
              return Promise.resolve({
                data: { data: todo, status: 'success' },
                status: 200,
                statusText: 'OK',
                headers: {},
                config,
              } as unknown as AxiosResponse)
            }
          }
        } else if (method === 'POST') {
          // Create todo
          const newTodo: Todo = {
            id: String(mockTodos.length + 1),
            ...(config.data as Omit<Todo, 'id' | 'createdAt' | 'updatedAt'>),
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          }
          mockTodos.push(newTodo)
          return Promise.resolve({
            data: { data: newTodo, status: 'success' },
            status: 201,
            statusText: 'Created',
            headers: {},
            config,
          } as unknown as AxiosResponse)
        } else if (method === 'PUT') {
          // Update todo
          const id = url.split('/')[2]
          const index = mockTodos.findIndex((t) => t.id === id)
          if (index !== -1) {
            mockTodos[index] = {
              ...mockTodos[index],
              ...(config.data as Partial<Todo>),
              updatedAt: new Date().toISOString(),
            }
            return Promise.resolve({
              data: { data: mockTodos[index], status: 'success' },
              status: 200,
              statusText: 'OK',
              headers: {},
              config,
            } as unknown as AxiosResponse)
          }
        } else if (method === 'PATCH' && url.includes('/toggle')) {
          // Toggle todo
          const id = url.split('/')[2]
          const index = mockTodos.findIndex((t) => t.id === id)
          if (index !== -1) {
            mockTodos[index].completed = !mockTodos[index].completed
            mockTodos[index].updatedAt = new Date().toISOString()
            return Promise.resolve({
              data: { data: mockTodos[index], status: 'success' },
              status: 200,
              statusText: 'OK',
              headers: {},
              config,
            } as unknown as AxiosResponse)
          }
        } else if (method === 'DELETE') {
          // Delete todo
          const id = url.split('/')[2]
          mockTodos = mockTodos.filter((t) => t.id !== id)
          return Promise.resolve({
            data: { status: 'success' },
            status: 204,
            statusText: 'No Content',
            headers: {},
            config,
          } as unknown as AxiosResponse)
        }
      }

      return Promise.reject(error)
    },
  )
}

/**
 * Reset mock data to initial state
 */
export function resetMockData() {
  mockUsers = [...MOCK_USERS]
  mockTodos = [...MOCK_TODOS]
}
