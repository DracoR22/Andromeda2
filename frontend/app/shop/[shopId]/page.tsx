'use client'

import CatLoader from "@/components/loaders/CatLoader"
import ShopInfo from "@/components/shop/ShopInfo"
import ShopProfileData from "@/components/shop/ShopProfileData"
import styles from "@/styles/styles"
import { redirect, useRouter } from "next/navigation"
import { useSelector } from "react-redux"

const ShopPage = ({ params }: { params: { shopId: string }}) => {

  const { seller, isLoading } = useSelector((state: any) => state.seller)

  const router = useRouter()

  if(!seller) {
    redirect("/")
  }

  return (
    <>
     {isLoading ? (
      <div>
        <CatLoader/>
      </div>
     ) : (
      <div className={`${styles.section} bg-[#f5f5f5]`}>
       <div className="w-full flex py-10 justify-between">
       <div className="w-[25%] bg-[#fff] rounded-[4px] shadow-sm overflow-y-scroll h-[90vh] sticky top-10 left-0 z-10">
       <ShopInfo seller={seller} isOwner={true} />
       </div>
         <div className="w-[72%] rounded-[4px]">
          <ShopProfileData isOwner={true} id={params.shopId}/>
         </div>
      </div>
     </div>
     )}
    </>
  )
}

export default ShopPage
