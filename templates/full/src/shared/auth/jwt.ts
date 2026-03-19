const TOKEN_KEY = 'auth_token'

export const getToken = (): string | null => localStorage.getItem(TOKEN_KEY)

export const setToken = (token: string): void => localStorage.setItem(TOKEN_KEY, token)

export const removeToken = (): void => localStorage.removeItem(TOKEN_KEY)

export function decodeJwtPayload<T = Record<string, unknown>>(token: string): T {
  const base64 = token.split('.')[1].replace(/-/g, '+').replace(/_/g, '/')
  return JSON.parse(atob(base64)) as T
}
