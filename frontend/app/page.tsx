import BestDeals from "@/components/BestDeals"
import Categories from "@/components/Categories"
import Events from "@/components/Events"
import Footer from "@/components/Footer"
import Hero from "@/components/hero/Hero"
import Header from "@/components/navbar/Header"
import FeaturedProduct from "@/components/product/FeaturedProduct"

const Home = () => {
  return (
    <div>
       <Header activeHeading={1}/>
       <Hero/>
       <Categories/>
       <BestDeals/>
       <Events/>
       <FeaturedProduct/>
       <Footer/>
    </div>
  )
}

export default Home
