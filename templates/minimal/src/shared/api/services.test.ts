import { describe, it, expect, beforeEach, vi } from 'vitest'
import { apiClient } from './client'
import { usersApi, todosApi } from './services'
import type { User } from './mock-data'

// Mock axios
vi.mock('./client', () => ({
  apiClient: {
    get: vi.fn(),
    post: vi.fn(),
    put: vi.fn(),
    patch: vi.fn(),
    delete: vi.fn(),
  },
}))

describe('API Services', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('usersApi', () => {
    it('should fetch all users', async () => {
      const mockUsers = [
        { id: '1', name: 'Alice', email: 'alice@test.com', createdAt: '2024-01-01' },
      ]
      vi.mocked(apiClient.get).mockResolvedValueOnce({
        data: { data: mockUsers, status: 'success' },
      })

      const result = await usersApi.getAll()

      expect(result).toEqual(mockUsers)
      expect(apiClient.get).toHaveBeenCalledWith('/users')
    })

    it('should fetch user by ID', async () => {
      const mockUser = { id: '1', name: 'Alice', email: 'alice@test.com', createdAt: '2024-01-01' }
      vi.mocked(apiClient.get).mockResolvedValueOnce({
        data: { data: mockUser, status: 'success' },
      })

      const result = await usersApi.getById('1')

      expect(result).toEqual(mockUser)
      expect(apiClient.get).toHaveBeenCalledWith('/users/1')
    })

    it('should create a user', async () => {
      const newUser = { name: 'Bob', email: 'bob@test.com' }
      const createdUser = { id: '2', ...newUser, createdAt: '2024-01-02' }
      vi.mocked(apiClient.post).mockResolvedValueOnce({
        data: { data: createdUser, status: 'success' },
      })

      const result = await usersApi.create(newUser as Omit<User, 'id' | 'createdAt'>)

      expect(result).toEqual(createdUser)
      expect(apiClient.post).toHaveBeenCalledWith('/users', newUser)
    })

    it('should update a user', async () => {
      const updatedUser = {
        id: '1',
        name: 'Alice Updated',
        email: 'alice.updated@test.com',
        createdAt: '2024-01-01',
      }
      vi.mocked(apiClient.put).mockResolvedValueOnce({
        data: { data: updatedUser, status: 'success' },
      })

      const result = await usersApi.update('1', { name: 'Alice Updated' })

      expect(result).toEqual(updatedUser)
      expect(apiClient.put).toHaveBeenCalledWith('/users/1', { name: 'Alice Updated' })
    })

    it('should delete a user', async () => {
      vi.mocked(apiClient.delete).mockResolvedValueOnce({})

      await usersApi.delete('1')

      expect(apiClient.delete).toHaveBeenCalledWith('/users/1')
    })
  })

  describe('todosApi', () => {
    it('should fetch all todos', async () => {
      const mockTodos = [
        {
          id: '1',
          title: 'Test',
          completed: false,
          userId: '1',
          createdAt: '2024-01-01',
          updatedAt: '2024-01-01',
        },
      ]
      vi.mocked(apiClient.get).mockResolvedValueOnce({
        data: { data: mockTodos, status: 'success' },
      })

      const result = await todosApi.getAll()

      expect(result).toEqual(mockTodos)
      expect(apiClient.get).toHaveBeenCalledWith('/todos')
    })

    it('should fetch todos by user', async () => {
      const mockTodos = [
        {
          id: '1',
          title: 'Test',
          completed: false,
          userId: '1',
          createdAt: '2024-01-01',
          updatedAt: '2024-01-01',
        },
      ]
      vi.mocked(apiClient.get).mockResolvedValueOnce({
        data: { data: mockTodos, status: 'success' },
      })

      const result = await todosApi.getByUser('1')

      expect(result).toEqual(mockTodos)
      expect(apiClient.get).toHaveBeenCalledWith('/todos', { params: { userId: '1' } })
    })

    it('should toggle todo completion', async () => {
      const toggledTodo = {
        id: '1',
        title: 'Test',
        completed: true,
        userId: '1',
        createdAt: '2024-01-01',
        updatedAt: '2024-01-02',
      }
      vi.mocked(apiClient.patch).mockResolvedValueOnce({
        data: { data: toggledTodo, status: 'success' },
      })

      const result = await todosApi.toggle('1')

      expect(result.completed).toBe(true)
      expect(apiClient.patch).toHaveBeenCalledWith('/todos/1/toggle', {})
    })
  })
})
