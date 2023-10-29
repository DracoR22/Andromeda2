'use client'

import AdminHeader from "@/components/admin/AdminHeader"
import AdminSideBar from "@/components/admin/AdminSideBar"
import AllUsers from "@/components/admin/AllUsers"
import ProtectedAdminRoute from "@/utils/AdminProtected"

const AdminUsersPage = () => {
  return (
    <ProtectedAdminRoute>
    <AdminHeader/>
    <div className="w-full flex">
      <div className="flex items-start justify-between w-full">
        <div className="w-[80px] 800px:w-[330px]">
          <AdminSideBar active={4} />
        </div>
        <AllUsers/>
      </div>
    </div>
  </ProtectedAdminRoute>
  )
}

export default AdminUsersPage
