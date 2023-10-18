'use client'

import DashboardHeader from "@/components/dashboard/DashboardHeader"
import DashboardSidebar from "@/components/dashboard/DashboardSidebar"
import CreateEvent from "@/components/events/CreateEvent"
import CatLoader from "@/components/loaders/CatLoader"
import { useSelector } from "react-redux"

const CreateEventPage = () => {

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
         <DashboardSidebar active={6} />
       </div>
       <div className="w-full items-center justify-center flex">
         <CreateEvent seller={seller}/>
       </div>
     </div>
   </div>
    )}
  </>
  )
}

export default CreateEventPage
