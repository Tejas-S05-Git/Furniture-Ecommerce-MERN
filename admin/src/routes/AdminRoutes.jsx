import { Routes, Route, Navigate } from "react-router-dom";

import AdminLayout from "../layouts/admin/AdminLayout";

import Dashboard from "../pages/admin/Dashboard";

const AdminRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="dashboard" />} />

      <Route element={<AdminLayout />}>
        <Route path="dashboard" element={<Dashboard />} />
      </Route>
    </Routes>
  );
};

export default AdminRoutes;