'use client'

import Footer from "@/components/Footer"
import Header from "@/components/navbar/Header"
import TrackOrder from "@/components/profile/TrackOrder"
import { useSelector } from "react-redux"
import { redirect } from "next/navigation"

const TrackOrderPage = ({ params }: { params: { orderId: string }}) => {

    const { user } = useSelector((state: any) => state.user);

    if(!user) {
        redirect("/")
    }

  return (
    <div>
      <Header/>
      <TrackOrder id={params.orderId}/>
      <Footer/>
    </div>
  )
}

export default TrackOrderPage
