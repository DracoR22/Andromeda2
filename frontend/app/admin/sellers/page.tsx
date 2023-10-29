'use client'

import AdminHeader from '@/components/admin/AdminHeader'
import AdminSideBar from '@/components/admin/AdminSideBar'
import AllSellers from '@/components/admin/AllSellers'
import ProtectedAdminRoute from '@/utils/AdminProtected'
import React from 'react'

const AdminSellersPage = () => {
  return (
    <ProtectedAdminRoute>
    <AdminHeader/>
    <div className="w-full flex">
      <div className="flex items-start justify-between w-full">
        <div className="w-[80px] 800px:w-[330px]">
          <AdminSideBar active={3} />
        </div>
        <AllSellers/>
      </div>
    </div>
  </ProtectedAdminRoute>
  )
}

export default AdminSellersPage
