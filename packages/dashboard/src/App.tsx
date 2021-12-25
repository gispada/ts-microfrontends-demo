import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import DashboardRoutes from './routes'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="*" element={<DashboardRoutes />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
