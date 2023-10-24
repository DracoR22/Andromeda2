'use client'

import DashboardHeader from "@/components/dashboard/DashboardHeader"
import DashboardSidebar from "@/components/dashboard/DashboardSidebar"
import CatLoader from "@/components/loaders/CatLoader"
import DashboardMain from "@/components/shop/DashboardMain"
import { redirect } from "next/navigation"
import { useSelector } from "react-redux"

const DashboardPage = () => {

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
      <div className="flex items-center justify-between w-full">
        <div className="w-[80px] 800px:w-[330px]">
          <DashboardSidebar active={1}/>
        </div>
        <DashboardMain/>
      </div>
    </div>
     )}
   </>
  )
}

export default DashboardPage
