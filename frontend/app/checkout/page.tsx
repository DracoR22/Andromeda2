'use client'

import Footer from "@/components/Footer"
import CheckOutSteps from "@/components/checkout/CheckOutSteps"
import Checkout from "@/components/checkout/Checkout"
import Header from "@/components/navbar/Header"
import Heading from "@/utils/Heading"

const CheckoutPage = () => {
  return (
    <div>
      <Heading title={`Checkout - Andromeda`} description="Andromeda is a platform where sellers can post and sell their products for free without restrictions"
      keywords="e-commerce"/>
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
