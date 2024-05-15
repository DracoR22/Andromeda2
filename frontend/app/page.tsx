'use client'

import BestDeals from "@/components/BestDeals"
import Categories from "@/components/Categories"
import ClientOnly from "@/components/ClientOnly"
import Events from "@/components/Events"
import Footer from "@/components/Footer"
import BrandSlider from "@/components/hero/BrandSlider"
import Hero from "@/components/hero/Hero"
import Header from "@/components/navbar/Header"
import FeaturedProduct from "@/components/product/FeaturedProduct"
import Heading from "@/utils/Heading"
import { useSession } from "next-auth/react"

const Home = () => {

  const session = useSession()
  console.log(session.data?.user?.email)

  return (
    <div>
      <Heading title={`Home - Andromeda`} description="Andromeda is a platform where sellers can post and sell their products for free without restrictions"
      keywords="e-commerce"/>
       <Header activeHeading={1}/>
       <Hero/>
       <BrandSlider/>
      <div className="mx-10">
       <Categories/>
       <BestDeals/>
       <Events/>
       <FeaturedProduct/>
       <Footer/>
      </div>
    </div>
  )
}

export default Home
