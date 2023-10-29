'use client'

import AdminAllEvents from "@/components/admin/AdminAllEvents"
import AdminHeader from "@/components/admin/AdminHeader"
import AdminSideBar from "@/components/admin/AdminSideBar"
import ProtectedAdminRoute from "@/utils/AdminProtected"

const AdminEventsPage = () => {
  return (
    <ProtectedAdminRoute>
    <AdminHeader/>
    <div className="w-full flex">
      <div className="flex items-start justify-between w-full">
        <div className="w-[80px] 800px:w-[330px]">
          <AdminSideBar active={6} />
        </div>
        <AdminAllEvents/>
      </div>
    </div>
  </ProtectedAdminRoute>
  )
}

export default AdminEventsPage
