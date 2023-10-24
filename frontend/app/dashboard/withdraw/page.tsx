'use client'

import DashboardHeader from "@/components/dashboard/DashboardHeader"
import DashboardSidebar from "@/components/dashboard/DashboardSidebar"
import CatLoader from "@/components/loaders/CatLoader"
import Withdraw from "@/components/shop/Withdraw"
import { useSelector } from "react-redux"

const ShopWithdrawPage = () => {

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
     <div className="flex justify-between w-full">
       <div className="w-[80px] 800px:w-[330px]">
         <DashboardSidebar active={7}/>
       </div>
       <div className="w-full justify-center flex">
         <Withdraw/>
       </div>
     </div>
   </div>
    )}
  </>
  )
}

export default ShopWithdrawPage
