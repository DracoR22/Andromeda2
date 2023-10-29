'use client'

import AdminAllProducts from "@/components/admin/AdminAllProducts"
import AdminHeader from "@/components/admin/AdminHeader"
import AdminSideBar from "@/components/admin/AdminSideBar"
import ProtectedAdminRoute from "@/utils/AdminProtected"

const AdminAllProductsPage = () => {
  return (
    <ProtectedAdminRoute>
    <AdminHeader/>
    <div className="w-full flex">
      <div className="flex items-start justify-between w-full">
        <div className="w-[80px] 800px:w-[330px]">
          <AdminSideBar active={5} />
        </div>
        <AdminAllProducts/>
      </div>
    </div>
  </ProtectedAdminRoute>
  )
}

export default AdminAllProductsPage
