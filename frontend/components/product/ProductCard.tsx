"use client"

import Link from "next/link";
import { AiFillHeart,AiFillStar, AiOutlineEye, AiOutlineHeart, AiOutlineShoppingCart, AiOutlineStar } from "react-icons/ai";
import { useState, useEffect } from "react"
import styles from "@/styles/styles";
import ProductDetailsCard from "./ProductDetailsCard";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { removeFromWishlist, addToWishlist } from "@/redux/actions/wishlist"
import { toast } from "react-toastify";
import { addTocart } from "@/redux/actions/cart";
import Ratings from "./Ratings";

interface Props {
    data: any
    isShop?: boolean
    isEvent?: boolean
}

const ProductCard = ({ data, isShop, isEvent }: Props) => {

  const { wishlist } = useSelector((state: any) =>  state.wishlist)
  const { cart } = useSelector((state: any) => state.cart)

  const [click, setClick] = useState(false)
  const [open, setOpen] = useState(false)

  const [count, setCount] = useState(1);

  const dispatch = useDispatch()

  const d = data.name
  const product_name = d.replace(/\s+/g, "-")

  useEffect(() => {
    if(wishlist && wishlist.find((i: any) => i._id === data._id)) {
      setClick(true)
    } else {
      setClick(false)
    }
  }, [wishlist])

  const removeFromWishlistHandler = (data: any) => {
    setClick(!click)
    dispatch(removeFromWishlist(data))
  }

  const addToWishlistHandler = (data: any) => {
    setClick(!click)
    dispatch(addToWishlist(data))
  }

  const addToCartHandler = (id: any) => {
    const isItemExists = cart && cart.find((i: any) => i._id === id);
    if (isItemExists) {
      toast.error("Item already in cart!");
    } else {
      if (data.stock < 1) {
        toast.error("Product stock limited!");
      } else {
        const cartData = { ...data, qty: 1 };
        dispatch(addTocart(cartData));
        toast.success("Item added to cart successfully!");
      }
    }
  };


  return (
   <>
      <div className="w-full h-[370px] bg-white rounded-lg shadow-sm p-3 relative cursor-pointer">
      <div className="flex justify-end"></div>
      <Link href={`${isEvent === true ? `/product/${data._id}?isEvent=true` : `/product/${data._id}`}`}>
        <Image src={data.images && data.images[0]?.url} alt="" className="w-full h-[170px] object-contain" width={200} height={200}/>
      </Link>
      <Link href={`/shop/preview/${data?.shop._id}`}>
        <h5 className={`font-semibold text-sm mb-2`}>{data.shop.name}</h5>
      </Link>
      <Link href={`/product/${data._id}`}>
        <h4 className="pb-3 font-medium text-neutral-600 text-sm">
        {data.name.length > 40 ? data.name.slice(0, 40) + "..." : data.name}
        </h4>
        <div className="flex">
        <Ratings rating={data.ratings}/>
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
                 onClick={() => removeFromWishlistHandler(data)} color={click ? "red" : "#333"} title="Remove from wishlist"/>
            ) : (
                <AiOutlineHeart size={22} className="cursor-pointer absolute right-2 top-5"
                onClick={() => addToWishlistHandler(data)} color={click ? "red" : "#333"} title="Add to wishlist"/>
            )}
               <AiOutlineEye size={22} className="cursor-pointer absolute right-2 top-14"
                onClick={() => setOpen(!open)} color={"#333"} title="Quick view"/>
                <AiOutlineShoppingCart size={25} className="cursor-pointer absolute right-2 top-24"
                onClick={() => addToCartHandler(data._id)} color={"#444"} title="Add to cart"/>
                {open && (
                    <ProductDetailsCard open={open} setOpen={setOpen} data={data}/>
                )}
        </div>
     </div>
   </>
  )
}

export default ProductCard
