import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import AdminRoutes from './routes/AdminRoutes'
import SuperAdminRoutes from './routes/SuperAdminRoutes'
import { Route, Routes } from 'react-router-dom'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/admin/*" element={<AdminRoutes />} />
        <Route path="/sa/*" element={<SuperAdminRoutes />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App