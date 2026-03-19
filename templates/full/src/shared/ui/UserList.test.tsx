import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { UserList } from './UserList'
import * as hooks from '@shared/api/hooks'
import type { UseQueryResult } from '@tanstack/react-query'
import type { User } from '@shared/api'

vi.mock('@shared/api/hooks', () => ({
  useUsers: vi.fn(),
}))

const mockUsers: User[] = [
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
]

const renderWithQueryClient = (component: React.ReactNode) => {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  })
  return render(<QueryClientProvider client={queryClient}>{component}</QueryClientProvider>)
}

describe('UserList', () => {
  it('shows loading state initially', () => {
    vi.mocked(hooks.useUsers).mockReturnValueOnce({
      data: undefined,
      isLoading: true,
      error: null,
    } as unknown as UseQueryResult<User[], Error>)

    renderWithQueryClient(<UserList />)
    // Check for loading spinner (animating SVG)
    const spinner = document.querySelector('svg.animate-spin')
    expect(spinner).toBeInTheDocument()
  })

  it('displays error message on error', () => {
    const error = new Error('Failed to fetch')
    vi.mocked(hooks.useUsers).mockReturnValueOnce({
      data: undefined,
      isLoading: false,
      error,
    } as unknown as UseQueryResult<User[], Error>)

    renderWithQueryClient(<UserList />)
    expect(screen.getByText(/Error loading users/)).toBeInTheDocument()
  })

  it('displays message when no users found', () => {
    vi.mocked(hooks.useUsers).mockReturnValueOnce({
      data: [],
      isLoading: false,
      error: null,
    } as unknown as UseQueryResult<User[], Error>)

    renderWithQueryClient(<UserList />)
    expect(screen.getByText(/No users found/)).toBeInTheDocument()
  })

  it('displays users correctly', () => {
    vi.mocked(hooks.useUsers).mockReturnValueOnce({
      data: mockUsers,
      isLoading: false,
      error: null,
    } as unknown as UseQueryResult<User[], Error>)

    renderWithQueryClient(<UserList />)

    expect(screen.getByText('Alice Johnson')).toBeInTheDocument()
    expect(screen.getByText('alice@example.com')).toBeInTheDocument()
    expect(screen.getByText('Bob Smith')).toBeInTheDocument()
    expect(screen.getByText('bob@example.com')).toBeInTheDocument()
  })

  it('displays user avatars', () => {
    vi.mocked(hooks.useUsers).mockReturnValueOnce({
      data: mockUsers,
      isLoading: false,
      error: null,
    } as unknown as UseQueryResult<User[], Error>)

    renderWithQueryClient(<UserList />)

    const avatars = screen.getAllByRole('img')
    expect(avatars).toHaveLength(2)
  })
})
