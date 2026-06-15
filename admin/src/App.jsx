import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import AdminRoutes from './routes/AdminRoutes'
import SuperAdminRoutes from './routes/SuperAdminRoutes'
import { Route, Routes } from 'react-router-dom'
import AdminProtectedRoute from "./routes/AdminProtectedRoute";
import SuperAdminProtectedRoute from "./routes/SuperAdminProtectedRoute";
import AdminLogin from "./pages/auth/AdminLogin";

const App = () => {
  return (
   <BrowserRouter>
  <Routes>

    <Route
      path="/admin/login"
      element={<AdminLogin />}
    />

    <Route
      path="/admin/*"
      element={
        <AdminProtectedRoute>
          <AdminRoutes />
        </AdminProtectedRoute>
      }
    />

    <Route
      path="/sa/*"
      element={
        <SuperAdminProtectedRoute>
          <SuperAdminRoutes />
        </SuperAdminProtectedRoute>
      }
    />

  </Routes>
</BrowserRouter>
  )
}

export default App