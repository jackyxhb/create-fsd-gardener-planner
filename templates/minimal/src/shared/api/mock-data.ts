/**
 * Mock data for development and testing
 */

export interface User {
  id: string
  name: string
  email: string
  avatar?: string
  createdAt: string
}

export interface Todo {
  id: string
  title: string
  description?: string
  completed: boolean
  userId: string
  createdAt: string
  updatedAt: string
}

export interface ApiResponse<T> {
  data: T
  status: 'success' | 'error'
  message?: string
}

// Mock Users
export const MOCK_USERS: User[] = [
  {
    id: '1',
    name: 'Alice Johnson',
    email: 'alice@example.com',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alice',
    createdAt: '2024-01-15T10:30:00Z',
  },
  {
    id: '2',
    name: 'Bob Smith',
    email: 'bob@example.com',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Bob',
    createdAt: '2024-01-16T14:20:00Z',
  },
  {
    id: '3',
    name: 'Carol Davis',
    email: 'carol@example.com',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Carol',
    createdAt: '2024-01-17T09:15:00Z',
  },
]

// Mock Todos
export const MOCK_TODOS: Todo[] = [
  {
    id: '1',
    title: 'Set up project structure',
    description: 'Initialize FSD layers and configure build tools',
    completed: true,
    userId: '1',
    createdAt: '2024-02-01T08:00:00Z',
    updatedAt: '2024-02-01T16:30:00Z',
  },
  {
    id: '2',
    title: 'Add authentication',
    description: 'Implement JWT-based authentication',
    completed: true,
    userId: '1',
    createdAt: '2024-02-02T08:00:00Z',
    updatedAt: '2024-02-03T10:00:00Z',
  },
  {
    id: '3',
    title: 'Design database schema',
    description: 'Plan data models and relationships',
    completed: false,
    userId: '2',
    createdAt: '2024-02-04T08:00:00Z',
    updatedAt: '2024-02-04T08:00:00Z',
  },
  {
    id: '4',
    title: 'Implement API endpoints',
    description: 'Create REST endpoints for CRUD operations',
    completed: false,
    userId: '1',
    createdAt: '2024-02-05T08:00:00Z',
    updatedAt: '2024-02-05T08:00:00Z',
  },
]
