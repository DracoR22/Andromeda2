import BestDeals from "@/components/BestDeals"
import Categories from "@/components/Categories"
import Events from "@/components/Events"
import Footer from "@/components/Footer"
import Hero from "@/components/hero/Hero"
import Header from "@/components/navbar/Header"
import FeaturedProduct from "@/components/product/FeaturedProduct"
import Heading from "@/utils/Heading"

const Home = () => {
  return (
    <div>
      <Heading title={`Andromeda - Home`} description="Andromeda is a platform where sellers can post and sell their products for free without restrictions"
      keywords="e-commerce"/>
       <Header activeHeading={1}/>
       <Hero/>
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
