'use client'

import animation from "@/public/cat_loader.json"
import Lottie from "lottie-react";

const CatLoader = () => {

  return (
    <div className="w-full h-screen flex items-center justify-center">
      <Lottie animationData={animation} loop={true} width={300} height={300} />
    </div>
  )
}

export default CatLoader
