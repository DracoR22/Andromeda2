'use client'

import AdminHeader from "@/components/admin/AdminHeader"
import AdminSideBar from "@/components/admin/AdminSideBar"
import AllWithdraws from "@/components/admin/AllWithdraws"
import ProtectedAdminRoute from "@/utils/AdminProtected"

const AdminWithdrawRequestPage = () => {
  return (
    <ProtectedAdminRoute>
    <AdminHeader/>
    <div className="w-full flex">
      <div className="flex items-start justify-between w-full">
        <div className="w-[80px] 800px:w-[330px]">
          <AdminSideBar active={7} />
        </div>
        <AllWithdraws/>
      </div>
    </div>
  </ProtectedAdminRoute>
  )
}

export default AdminWithdrawRequestPage
