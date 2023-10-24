'use client'

import DashboardHeader from "@/components/dashboard/DashboardHeader"
import { useSelector } from "react-redux"
import { redirect } from "next/navigation"
import DashboardSidebar from "@/components/dashboard/DashboardSidebar"
import CatLoader from "@/components/loaders/CatLoader"
import ShopSettings from "@/components/shop/ShopSettings"

const ShopSettingsPage = () => {

    const { seller, isLoading } = useSelector((state: any) => state.seller)

    if(!seller) {
        redirect("/")
    }
    

  return (
    <>
    {isLoading ? (
        <div>
            <CatLoader/>
        </div>
    ) : (
        <div>
      <DashboardHeader seller={seller} />
       <div className="flex items-start justify-between w-full">
       <div className="w-[80px] 800px:w-[330px]">
        <DashboardSidebar active={11} />
      </div>
        <ShopSettings/>
      </div>
  </div>
    )}
    </>
  )
}

export default ShopSettingsPage
