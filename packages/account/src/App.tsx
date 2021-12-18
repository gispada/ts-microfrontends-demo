import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import AccountRoutes from './routes'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="*" element={<AccountRoutes />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
