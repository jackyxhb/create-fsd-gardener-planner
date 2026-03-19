import { type ReactNode } from 'react'

interface LayoutProps {
  children: ReactNode
  navbar?: ReactNode
}

export function Layout({ children, navbar }: LayoutProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      {navbar && (
        <nav className="border-b bg-white shadow-sm">{navbar}</nav>
      )}
      <main className="mx-auto max-w-7xl px-4 py-8">{children}</main>
    </div>
  )
}
