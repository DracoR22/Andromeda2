'use client'

import DashboardHeader from "@/components/dashboard/DashboardHeader"
import DashboardSidebar from "@/components/dashboard/DashboardSidebar"
import CatLoader from "@/components/loaders/CatLoader"
import DashboardMessages from "@/components/shop/DashboardMessages"
import { useSelector } from "react-redux"

const ShopInboxPage = () => {

    const { seller, isLoading } = useSelector((state: any) => state.seller)

  return (
    <>
    {isLoading ? (
     <div>
       <CatLoader/>
     </div>
    ) : (
     <div>
     <DashboardHeader seller={seller}/>
     <div className="flex items-start justify-between w-full">
       <div className="w-[80px] 800px:w-[330px]">
         <DashboardSidebar active={8}/>
       </div>
        <DashboardMessages/>
     </div>
   </div>
    )}
  </>
  )
}

export default ShopInboxPage
