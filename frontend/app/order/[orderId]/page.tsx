'use client'

import { useSelector } from "react-redux";
import { redirect } from "next/navigation"
import CatLoader from "@/components/loaders/CatLoader";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import Footer from "@/components/Footer";
import OrderDetails from "@/components/orders/OrderDetails";

const OrderIdPage = ({ params }: { params: { orderId: string }}) => {

    const { seller, isLoading } = useSelector((state: any) => state.seller);

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
     <DashboardHeader seller={seller}/>
     <div className="mx-10">
     <OrderDetails id={params.orderId}/>
     </div>
     <Footer/>
   </div>
    )}
  </>
  )
}

export default OrderIdPage
