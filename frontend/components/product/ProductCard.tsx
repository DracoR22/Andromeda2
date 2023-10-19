"use client"

import Link from "next/link";
import { AiFillHeart,AiFillStar, AiOutlineEye, AiOutlineHeart, AiOutlineShoppingCart, AiOutlineStar } from "react-icons/ai";
import { useState } from "react"
import styles from "@/styles/styles";
import ProductDetailsCard from "./ProductDetailsCard";
import Image from "next/image";

interface Props {
    data: any
    isShop?: boolean
    isEvent?: boolean
}

const ProductCard = ({ data, isShop, isEvent }: Props) => {

  const [click, setClick] = useState(false)
  const [open, setOpen] = useState(false)

  const d = data.name
  const product_name = d.replace(/\s+/g, "-")

  return (
   <>
      <div className="w-full h-[370px] bg-white rounded-lg shadow-sm p-3 relative cursor-pointer">
      <div className="flex justify-end"></div>
      <Link href={`${isEvent === true ? `/product/${data._id}?isEvent=true` : `/product/${data._id}`}`}>
        <Image src={data.images && data.images[0]?.url} alt="" className="w-full h-[170px] object-contain" width={200} height={200}/>
      </Link>
      <Link href="/">
        <h5 className={`font-semibold text-sm mb-2`}>{data.shop.name}</h5>
      </Link>
      <Link href={`/product/${product_name}`}>
        <h4 className="pb-3 font-medium text-neutral-600 text-sm">
        {data.name.length > 40 ? data.name.slice(0, 40) + "..." : data.name}
        </h4>
        <div className="flex">
          <AiFillStar className="mr-2 cursor-pointer text-[#F6BA00]"/>
          <AiFillStar className="mr-2 cursor-pointer text-[#F6BA00]"/>
          <AiFillStar className="mr-2 cursor-pointer text-[#F6BA00]"/>
          <AiFillStar className="mr-2 cursor-pointer text-[#F6BA00]"/>
          <AiFillStar className="mr-2 cursor-pointer text-[#F6BA00]"/>
        </div>
        
        <div className="py-2 flex items-center justify-between">
          <div className="flex">
             <h5 className={`font-semibold text-sm`}>
             ${data.originalPrice ? data.originalPrice + " $" : null}
             </h5>
          </div>
          <span className="text-neutral-600 text-xs">
            {data?.sold_out} sold
          </span>
        </div>
        </Link>

        {/* SIDE OPTIONS */}
        <div>
            {click ? (
                <AiFillHeart size={22} className="cursor-pointer absolute right-2 top-5"
                 onClick={() => setClick(!click)} color={click ? "red" : "#333"} title="Remove from wishlist"/>
            ) : (
                <AiOutlineHeart size={22} className="cursor-pointer absolute right-2 top-5"
                onClick={() => setClick(!click)} color={click ? "red" : "#333"} title="Add to wishlist"/>
            )}
               <AiOutlineEye size={22} className="cursor-pointer absolute right-2 top-14"
                onClick={() => setOpen(!open)} color={"#333"} title="Quick view"/>
                <AiOutlineShoppingCart size={25} className="cursor-pointer absolute right-2 top-24"
                onClick={() => setOpen(!open)} color={"#444"} title="Add to cart"/>
                {open && (
                    <ProductDetailsCard open={open} setOpen={setOpen} data={data}/>
                )}
        </div>
     </div>
   </>
  )
}

export default ProductCard
