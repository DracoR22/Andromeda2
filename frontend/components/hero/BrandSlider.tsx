'use client'

import logo1 from "@/public/logos/3m.svg"
import logo2 from "@/public/logos/barstool-store.svg"
import logo3 from "@/public/logos/budweiser.svg"
import logo4 from "@/public/logos/buzzfeed.svg"
import logo5 from "@/public/logos/forbes.svg"
import logo6 from "@/public/logos/macys.svg"
import logo7 from "@/public/logos/menshealth.svg"
import logo8 from "@/public/logos/mrbeast.svg"

import Image from "next/image"
import { useEffect, useState } from "react"

const BrandSlider = () => {
    const logos = [
      logo1, logo2, logo3, logo4, logo5, logo6, logo7, logo8
    ];
  
    const [copyLogos, setCopyLogos] = useState(logos);
  
    return (

       <div className="logos">
        <div className="logos-slide flex items-center">
          {copyLogos.map((logo, index) => (
            <Image key={index} src={logo} alt="" width={500} height={500} />
          ))}
          {copyLogos.map((logo, index) => (
            <Image key={index} src={logo} alt="" width={500} height={500} />
          ))}
        </div>
      </div>
  
    );
  };
  
  export default BrandSlider;
