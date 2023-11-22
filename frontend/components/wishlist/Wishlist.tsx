'use client'

import { addTocart } from "@/redux/actions/cart"
import { removeFromWishlist } from "@/redux/actions/wishlist"
import styles from "@/styles/styles"
import { useCallback, useEffect, useRef, useState } from "react"
import { AiOutlineHeart } from "react-icons/ai"
import { BsCartPlus } from "react-icons/bs"
import { RxCross1 } from "react-icons/rx"
import { useDispatch, useSelector } from "react-redux"

interface Props {
    setOpenWishlist: any
}

const Wishlist = ({ setOpenWishlist }: Props) => {
  
  const { wishlist } = useSelector((state: any) => state.wishlist);
  const dispatch = useDispatch();

  const removeFromWishlistHandler = (data: any) => {
    dispatch(removeFromWishlist(data));
  };

  const addToCartHandler = (data: any) => {
    const newData = {...data, qty:1};
    dispatch(addTocart(newData));
    setOpenWishlist(false);
  }

  // Close on click outside
const closeRef = useRef<HTMLDivElement>(null);

const handleOutsideClick = useCallback(
  (event: MouseEvent) => {
    if (closeRef.current && !closeRef.current.contains(event.target as Node)) {
      setOpenWishlist(false);
    }
  },
  []
);

useEffect(() => {
  // Add a click event listener to the document to close the wishlist when clicking outside of it
  document.addEventListener('mousedown', handleOutsideClick);
  
  return () => {
    // Remove the event listener when the component unmounts
    document.removeEventListener('mousedown', handleOutsideClick);
  };
}, []);


  return (
    <div className="fixed top-0 left-0 w-full bg-[#0000004b] h-screen z-10">
    <div  className="fixed top-0 right-0 h-full w-[80%] overflow-y-scroll 800px:w-[25%] bg-white flex flex-col justify-between shadow-sm">
      {wishlist && wishlist.length === 0 ? (
        <div className="w-full h-screen flex items-center justify-center">
          <div className="flex w-full justify-end pt-5 pr-5 fixed top-3 right-3">
            <RxCross1
              size={25}
              className="cursor-pointer"
              onClick={() => setOpenWishlist(false)}
            />
          </div>
          <h5>Wishlist Items is empty!</h5>
        </div>
      ) : (
        <>
          <div>
            <div className="flex w-full justify-end pt-5 pr-5">
              <RxCross1
                size={25}
                className="cursor-pointer"
                onClick={() => setOpenWishlist(false)}
              />
            </div>
            {/* Item length */}
            <div className={`${styles.noramlFlex} p-4`}>
              <AiOutlineHeart size={25} />
              <h5 className="pl-2 text-[20px] font-[500]">
                {wishlist && wishlist.length} items
              </h5>
            </div>

            {/* cart Single Items */}
            <br />
            <div className="w-full border-t">
              {wishlist && wishlist.map((i: any, index: number) => (
                  <CartSingle addToCartHandler={addToCartHandler} removeFromWishlistHandler={removeFromWishlistHandler} key={index} data={i} />
                ))}
            </div>
          </div>
        </>
      )}
    </div>
  </div>
  )
}

interface CartSingleProps {
data: any
removeFromWishlistHandler: any
addToCartHandler: any
}

const CartSingle = ({ data, removeFromWishlistHandler, addToCartHandler }: CartSingleProps) => {
    const [value, setValue] = useState(1);
    const totalPrice = data.discountPrice * value;
  
    return (
      <div className="border-b p-4">
        <img
            src={`${data?.images[0]?.url}`}
            alt=""
            className="w-[130px] h-[130px] object-cover ml-2 mr-2 rounded-[5px]"
          />
        <div className="w-full 800px:flex items-center">
          <RxCross1 className="cursor-pointer 800px:mb-['unset'] 800px:ml-['unset'] mb-2 ml-2"
          onClick={() => removeFromWishlistHandler(data)} size={50}
          />
  
          <div className="pl-[5px]">
            <h1>{data.name}</h1>
            <h4 className="font-[600] pt-3 800px:pt-[3px] text-[17px] text-[#d02222] font-Roboto">
              US${totalPrice}
            </h4>
          </div>
          <div>
            <BsCartPlus size={20} className="cursor-pointer" tile="Add to cart"
             onClick={() => addToCartHandler(data)}
            />
          </div>
        </div>
      </div>
    );
  };

export default Wishlist
