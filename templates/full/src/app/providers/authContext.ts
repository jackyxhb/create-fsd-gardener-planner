import { createContext } from 'react'

export interface AuthCtx {
  isAuthenticated: boolean
  login: (token: string) => void
  logout: () => void
}

export const AuthContext = createContext<AuthCtx | null>(null)
