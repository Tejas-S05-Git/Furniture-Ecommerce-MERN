import React from 'react'
import { Outlet } from 'react-router-dom'
import SuperAdminSidebar from '../../components/sidebar/SuperAdminSidebar'
import SuperAdminHeader from '../../components/header/SuperAdminHeader'
import { useState } from 'react'

const SuperAdminLayout = () => {
  const [open, setOpen] = useState(false);
  return (
     <div className="flex min-h-screen bg-secondary">
      <SuperAdminSidebar open={open} />

      <div className="flex-1 flex flex-col">
        <SuperAdminHeader setOpen={setOpen} />

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
  )
}

export default SuperAdminLayout