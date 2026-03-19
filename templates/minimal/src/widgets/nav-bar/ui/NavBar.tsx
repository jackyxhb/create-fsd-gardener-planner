import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '@app/providers/AuthProvider'
import { Button } from '@shared/ui/Button'

export function NavBar() {
  const { isAuthenticated, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/auth/signin')
  }

  return (
    <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4">
      {/* Left: app name */}
      <Link to="/main" className="text-lg font-semibold text-gray-900">
        My App
      </Link>
      {/* Center: nav links */}
      <div className="flex items-center gap-6">
        <Link to="/main" className="text-sm text-gray-600 hover:text-gray-900">
          Home
        </Link>
        {/* Add more nav links here */}
      </div>
      {/* Right: auth actions */}
      <div className="flex items-center gap-2">
        {isAuthenticated ? (
          <Button variant="secondary" onClick={handleLogout}>
            Logout
          </Button>
        ) : (
          <>
            <Button variant="secondary" onClick={() => navigate('/auth/signin')}>
              Sign in
            </Button>
            <Button variant="primary" onClick={() => navigate('/auth/signup')}>
              Sign up
            </Button>
          </>
        )}
      </div>
    </div>
  )
}
