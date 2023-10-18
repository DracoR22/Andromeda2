'use client'

import DashboardHeader from "@/components/dashboard/DashboardHeader"
import DashboardSidebar from "@/components/dashboard/DashboardSidebar"
import CatLoader from "@/components/loaders/CatLoader"
import AllProducts from "@/components/product/AllProducts"
import { useSelector } from "react-redux"

const AllShopProductsPage = () => {

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
         <DashboardSidebar active={3} />
       </div>
       <div className="w-full justify-center flex">
         <AllProducts/>
       </div>
     </div>
   </div>
    )}
  </>
  )
}

export default AllShopProductsPage
