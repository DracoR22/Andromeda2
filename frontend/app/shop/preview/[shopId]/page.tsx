'use client'

import ShopInfo from "@/components/shop/ShopInfo"
import ShopProfileData from "@/components/shop/ShopProfileData"
import styles from "@/styles/styles"
import { useSelector } from "react-redux"

const ShopPreviewPage = ({ params }: { params: { shopId: string }}) => {

    return (
        <div className={`${styles.section} bg-[#f5f5f5]`}>
        <div className="w-full 800px:flex py-10 justify-between">
         <div className="800px:w-[25%] bg-[#fff] rounded-[4px] shadow-sm 800px:overflow-y-scroll 800px:h-[90vh] 800px:sticky top-10 left-0 z-10">
           <ShopInfo isOwner={false} id={params.shopId}/>
         </div>
         <div className="800px:w-[72%] mt-5 800px:mt-['unset'] rounded-[4px]">
           <ShopProfileData isOwner={false} id={params.shopId}/>
         </div>
        </div>
   </div>
    )
  }
  
  export default ShopPreviewPage
  