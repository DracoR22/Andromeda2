import ShopCreateComp from "@/components/shop/ShopCreateComp"
import Heading from "@/utils/Heading"


const ShopCreate = () => {
  return (
    <div>
           <Heading title={`Shop-Register - Andromeda`} description="Andromeda is a platform where sellers can post and sell their products for free without restrictions"
         keywords="e-commerce"/>
      <ShopCreateComp/>
    </div>
  )
}

export default ShopCreate
