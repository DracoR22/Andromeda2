'use client'

import Footer from "@/components/Footer"
import CheckOutSteps from "@/components/checkout/CheckOutSteps"
import Payment from "@/components/checkout/Payment"
import Header from "@/components/navbar/Header"

const PaymentPage = () => {
  return (
    <div>
      <Header/>
      <br />
      <br />
      <CheckOutSteps active={2}/>
       <Payment/>
      <br />
      <br />
      <Footer/>
    </div>
  )
}

export default PaymentPage