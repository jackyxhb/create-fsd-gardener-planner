/**
 * Example component: User List
 * Demonstrates fetching and displaying data using React Query hooks
 */

import { useUsers } from '@shared/api/hooks'
import { Loader2 } from 'lucide-react'

export function UserList() {
  const { data: users, isLoading, error } = useUsers()

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
          Error loading users: {error instanceof Error ? error.message : 'Unknown error'}
        </p>
      </div>
    )
  }

  if (!users || users.length === 0) {
    return <p className="text-gray-500">No users found</p>
  }

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Users</h3>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {users.map((user) => (
          <div key={user.id} className="rounded-lg border border-gray-200 p-4">
            {user.avatar && (
              <img
                src={user.avatar}
                alt={user.name}
                className="mb-3 h-16 w-16 rounded-full"
              />
            )}
            <h4 className="font-semibold">{user.name}</h4>
            <p className="text-sm text-gray-600">{user.email}</p>
            <p className="mt-2 text-xs text-gray-500">
              {new Date(user.createdAt).toLocaleDateString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}
