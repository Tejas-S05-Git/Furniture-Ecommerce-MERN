import { Outlet } from "react-router-dom";
import AdminSidebar from "../../components/sidebar/AdminSidebar";
import AdminHeader from "../../components/header/AdminHeader";
import { useState } from "react";

const AdminLayout = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-secondary">
      <AdminSidebar open={open} />

      <div className="flex-1 flex flex-col">
        <AdminHeader setOpen={setOpen} />

        <main className="p-6">
          <Outlet />
        </main>
      </div>

      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 bg-black/50 lg:hidden z-40"
        />
      )}
    </div>
  );
};

export default AdminLayout;