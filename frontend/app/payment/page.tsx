'use client'

import Footer from "@/components/Footer"
import CheckOutSteps from "@/components/checkout/CheckOutSteps"
import Payment from "@/components/checkout/Payment"
import Header from "@/components/navbar/Header"
import { server } from "@/utils/server"
import { Elements } from "@stripe/react-stripe-js"
import axios from "axios"
import { useEffect, useState } from 'react'
import { loadStripe } from "@stripe/stripe-js"
import ClientOnly from "@/components/ClientOnly"
import { useSelector } from "react-redux"
import { redirect } from "next/navigation"

const PaymentPage = () => {

    const [stripeApiKey, setStripeApiKey] = useState("")
    const { user } = useSelector((state: any) => state.user);

    async function getStripeApikey() {
      const { data } = await axios.get(`${server}/payment/stripeapikey`);
      setStripeApiKey(data.stripeApikey);
    }

    useEffect(() => {
      getStripeApikey();
    }, [])

    if(!user) {
      redirect("/")
    }

  return (
    <div>
      <ClientOnly>
      <Header/>
      <br />
      <br />
      <CheckOutSteps active={2}/>
       {stripeApiKey && (
        <Elements stripe={loadStripe(stripeApiKey)}>
        <Payment/>
       </Elements>
       )}
      <br />
      <br />
      <Footer/>
      </ClientOnly>
    </div>
  )
}

export default PaymentPage