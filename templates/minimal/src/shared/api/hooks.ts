/**
 * React Query hooks for API operations
 * Provides data fetching, caching, and state management
 */

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { usersApi, todosApi } from './services'
import type { User, Todo } from './mock-data'

// ===== Users Queries =====

export const useUsers = () => {
  return useQuery({
    queryKey: ['users'],
    queryFn: () => usersApi.getAll(),
    staleTime: 5 * 60 * 1000, // 5 minutes
  })
}

export const useUser = (id: string) => {
  return useQuery({
    queryKey: ['users', id],
    queryFn: () => usersApi.getById(id),
    staleTime: 5 * 60 * 1000,
  })
}

export const useCreateUser = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (user: Omit<User, 'id' | 'createdAt'>) => usersApi.create(user),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] })
    },
  })
}

export const useUpdateUser = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ id, user }: { id: string; user: Partial<User> }) =>
      usersApi.update(id, user),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['users'] })
      queryClient.setQueryData(['users', data.id], data)
    },
  })
}

export const useDeleteUser = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (id: string) => usersApi.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] })
    },
  })
}

// ===== Todos Queries =====

export const useTodos = () => {
  return useQuery({
    queryKey: ['todos'],
    queryFn: () => todosApi.getAll(),
    staleTime: 5 * 60 * 1000,
  })
}

export const useTodosByUser = (userId: string) => {
  return useQuery({
    queryKey: ['todos', 'user', userId],
    queryFn: () => todosApi.getByUser(userId),
    staleTime: 5 * 60 * 1000,
  })
}

export const useTodo = (id: string) => {
  return useQuery({
    queryKey: ['todos', id],
    queryFn: () => todosApi.getById(id),
    staleTime: 5 * 60 * 1000,
  })
}

export const useCreateTodo = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (todo: Omit<Todo, 'id' | 'createdAt' | 'updatedAt'>) =>
      todosApi.create(todo),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] })
    },
  })
}

export const useUpdateTodo = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ id, todo }: { id: string; todo: Partial<Todo> }) =>
      todosApi.update(id, todo),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['todos'] })
      queryClient.setQueryData(['todos', data.id], data)
    },
  })
}

export const useToggleTodo = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (id: string) => todosApi.toggle(id),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['todos'] })
      queryClient.setQueryData(['todos', data.id], data)
    },
  })
}

export const useDeleteTodo = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (id: string) => todosApi.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] })
    },
  })
}
