import { Routes, Route, Navigate } from "react-router-dom";

import SuperAdminLayout from "../layouts/super-admin/SuperAdminLayout";
import Dashboard from "../pages/admin/Dashboard";



const SuperAdminRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="dashboard" />} />

      <Route element={<SuperAdminLayout />}>
        <Route path="dashboard" element={<Dashboard />} />
      </Route>
    </Routes>
  );
};

export default SuperAdminRoutes;