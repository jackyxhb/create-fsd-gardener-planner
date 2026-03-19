import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { MainPage } from '@pages/main'
import { SignInPage, SignUpPage } from '@pages/auth'

export function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/main" replace />} />
        <Route path="/main" element={<MainPage />} />
        <Route path="/auth/signin" element={<SignInPage />} />
        <Route path="/auth/signup" element={<SignUpPage />} />
      </Routes>
    </BrowserRouter>
  )
}
