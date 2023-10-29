'use client'

import AdminDashboardMain from "@/components/admin/AdminDashboardMain"
import AdminHeader from "@/components/admin/AdminHeader"
import AdminSideBar from "@/components/admin/AdminSideBar"
import ProtectedAdminRoute from "@/utils/AdminProtected"

const AdminDashboardPage = () => {
  return (
    <ProtectedAdminRoute>
    <AdminHeader />
    <div className="w-full flex">
      <div className="flex items-start justify-between w-full">
        <div className="w-[80px] 800px:w-[330px]">
          <AdminSideBar active={1} />
        </div>
        <AdminDashboardMain />
      </div>
    </div>
  </ProtectedAdminRoute>
  )
}

export default AdminDashboardPage
