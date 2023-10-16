'use client'

import DashboardHeader from "@/components/dashboard/DashboardHeader"
import DashboardSidebar from "@/components/dashboard/DashboardSidebar"
import CatLoader from "@/components/loaders/CatLoader"
import CreateProduct from "@/components/product/CreateProduct"
import { useSelector } from "react-redux"

const CreateProductPage = () => {

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
         <DashboardSidebar active={4} />
       </div>
       <div className="w-full justify-center flex">
         <CreateProduct seller={seller}/>
       </div>
     </div>
   </div>
    )}
  </>
  )
}

export default CreateProductPage
