import BestDeals from "@/components/BestDeals"
import Categories from "@/components/Categories"
import Hero from "@/components/hero/Hero"
import Header from "@/components/navbar/Header"

const Home = () => {
  return (
    <div>
       <Header activeHeading={1}/>
       <Hero/>
       <Categories/>
       <BestDeals/>
    </div>
  )
}

export default Home
