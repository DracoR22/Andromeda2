'use client'

import Footer from "@/components/Footer";
import Header from "@/components/navbar/Header"
import animation from "@/public/success.json"
import Lottie from "lottie-react";

const OrderSuccessPage = () => {
  return (
    <div>
      <Header/>
      <Success />
      <Footer/>
    </div>
  )
}

const Success = () => {
    
    return (
      <div className="flex justify-center items-center mb-20">
      <div className="h-[30vh] w-[30vh]">
      <Lottie animationData={animation} loop={true} width={300} height={300} />
      <h5 className="text-center mb-14 text-[#000000a1]">
          Your order has been created
        </h5>
      </div>
        <br />
        <br />
      </div>
    );
  };
  

export default OrderSuccessPage
