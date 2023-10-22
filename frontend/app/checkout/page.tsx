'use client'

import Footer from "@/components/Footer"
import CheckOutSteps from "@/components/checkout/CheckOutSteps"
import Checkout from "@/components/checkout/Checkout"
import Header from "@/components/navbar/Header"

const CheckoutPage = () => {
  return (
    <div>
      <Header/>
      <br />
      <br />
      <CheckOutSteps active={1}/>
      <Checkout/>
      <br />
      <br />
      <Footer/>
    </div>
  )
}

export default CheckoutPage
