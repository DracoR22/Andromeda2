import ShopLoginComp from '@/components/shop/ShopLoginComp'
import Heading from '@/utils/Heading'
import React from 'react'

const ShopLogin = () => {
  return (
    <div>
        <Heading title={`Shop-Login - Andromeda`} description="Andromeda is a platform where sellers can post and sell their products for free without restrictions"
         keywords="e-commerce"/>
      <ShopLoginComp/>
    </div>
  )
}

export default ShopLogin
