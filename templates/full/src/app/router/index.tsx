import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { PlannerPage } from '@pages/planner'

export function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/planner" replace />} />
        <Route path="/planner" element={<PlannerPage />} />
      </Routes>
    </BrowserRouter>
  )
}
