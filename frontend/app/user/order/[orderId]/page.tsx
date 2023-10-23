'use client'

import { useSelector } from "react-redux";
import { redirect } from "next/navigation"
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import Header from "@/components/navbar/Header";
import Footer from "@/components/Footer";
import UserOrderDetails from "@/components/orders/UserOrderDetails";

const UserOrderIdPage = ({ params }: { params: { orderId: string }}) => {

    const { user } = useSelector((state: any) => state.user);

    if(!user) {
      redirect("/")
    }

  return (
    <div>
    <Header/>
     <div className="mx-10">
       <UserOrderDetails id={params.orderId}/>
     </div>
     <Footer/>
    </div>
  )
}

export default UserOrderIdPage
