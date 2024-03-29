'use client'

import styles from "@/styles/styles"
import { RxCross1 } from "react-icons/rx"
import { IoBagHandleOutline } from "react-icons/io5"
import Link from "next/link"
import { useCallback, useEffect, useRef, useState } from "react"
import { toast } from "react-toastify"
import { HiPlus, HiOutlineMinus } from "react-icons/hi"
import { useDispatch, useSelector } from "react-redux"
import { addTocart, removeFromCart } from "@/redux/actions/cart"

interface Props {
    setOpenCart: any
}

const Cart = ({ setOpenCart }: Props) => {

  const dispatch = useDispatch()

  const { cart } = useSelector((state: any) => state.cart)

  const removeFromCartHandler = (data: any) => {
    dispatch(removeFromCart(data));
  };

  const quantityChangeHandler = (data: any) => {
    dispatch(addTocart(data));
  };

const totalPrice = cart.reduce((acc: any, item: any) => acc + item.qty * item.discountPrice, 0);

// Convert the totalPrice to a string and get the first four characters
const totalPriceAsString = totalPrice.toString().substring(0, 4);

// Convert the extracted string back to a number
const firstFourNumbers = parseInt(totalPriceAsString, 10);

// Close on click outside
const cartRef = useRef<HTMLDivElement>(null);

const handleOutsideClick = useCallback(
  (event: MouseEvent) => {
    if (cartRef.current && !cartRef.current.contains(event.target as Node)) {
      setOpenCart(false);
    }
  },
  []
);

useEffect(() => {
  // Add a click event listener to the document to close the cart when clicking outside of it
  document.addEventListener('mousedown', handleOutsideClick);
  
  return () => {
    // Remove the event listener when the component unmounts
    document.removeEventListener('mousedown', handleOutsideClick);
  };
}, []);



  return (
    <>
    <div className="fixed top-0 left-0 w-full h-screen z-[999999]" >
    <div className="absolute top-0 left-0 right-0 bottom-0 bg-[#0000004b]" />
      <div  className="fixed top-0 right-0 h-full w-[80%] 800px:w-[25%] bg-white flex flex-col overflow-y-scroll justify-between shadow-sm">
        {cart && cart.length === 0 ? (
          <div className="w-full h-screen flex items-center justify-center">
            <div className="flex w-full justify-end pt-5 pr-5 fixed top-3 right-3">
              <RxCross1
                size={25}
                className="cursor-pointer"
                onClick={() => setOpenCart(false)}
              />
            </div>
            <h5>Cart Items is empty!</h5>
          </div>
        ) : (
          <>
            <div>
              <div className="flex w-full justify-end pt-5 pr-5">
                <RxCross1
                  size={25}
                  className="cursor-pointer"
                  onClick={() => setOpenCart(false)}
                />
              </div>
              {/* Item length */}
              <div className={`${styles.noramlFlex} p-4`}>
                <IoBagHandleOutline size={25} />
                <h5 className="pl-2 text-[20px] font-[500]">
                  {cart && cart.length} items
                </h5>
              </div>

              {/* cart Single Items */}
              <br />
              <div className="w-full border-t">
                {cart && cart.map((i: any, index: number) => (
                    <CartSingle
                      key={index}
                      data={i}
                      quantityChangeHandler={quantityChangeHandler}
                      removeFromCartHandler={removeFromCartHandler}
                    />
                  ))}
              </div>
            </div>

            <div className="px-5 mb-3">
              {/* checkout buttons */}
              <Link href="/checkout">
                <div
                  className={`h-[45px] flex items-center justify-center w-[100%] bg-[#e44343] hover:bg-[#bd4b4b] transition rounded-[5px]`}
                >
                  <h1 className="text-[#fff] text-sm font-[600]">
                    Checkout (USD${firstFourNumbers})
                  </h1>
                </div>
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
    </>
  )
}

interface CartSingleProps {
    data: any
    quantityChangeHandler: any
    removeFromCartHandler: any
}

const CartSingle = ({ data, quantityChangeHandler, removeFromCartHandler }: CartSingleProps) => {
    const [value, setValue] = useState(data.qty);
    const totalPrice = data.discountPrice * value;
  
    const increment = (data: any) => {
      if (data.stock < value) {
        toast.error("Product stock limited!");
      } else {
        setValue(value + 1);
        const updateCartData = { ...data, qty: value + 1 };
        quantityChangeHandler(updateCartData);
      }
    };
  
    const decrement = (data: any) => {
      setValue(value === 1 ? 1 : value - 1);
      const updateCartData = { ...data, qty: value === 1 ? 1 : value - 1 };
      quantityChangeHandler(updateCartData);
    };
  
    return (
      <div className="border-b p-4">
        <div className="w-full flex items-center">
          <div>
            <div
              className={`bg-[#e44343] border border-[#e4434373] rounded-full w-[25px] h-[25px] ${styles.noramlFlex} justify-center cursor-pointer`}
              onClick={() => increment(data)}
            >
              <HiPlus size={18} color="#fff" />
            </div>
            <span className="pl-[10px]">{data.qty}</span>
            <div
              className="bg-[#a7abb14f] rounded-full w-[25px] h-[25px] flex items-center justify-center cursor-pointer"
              onClick={() => decrement(data)}
            >
              <HiOutlineMinus size={16} color="#7d879c" />
            </div>
          </div>
          <div className="pl-[5px]">
          <img src={`${data?.images[0]?.url}`} alt="" className="w-[130px] h-[130px] object-cover ml-2 mr-2 rounded-[5px]"/>
            <h1 className="font-medium text-sm">{data.name}</h1>
             <h4 className="font-[400] text-[15px] text-[#00000082]">
              ${data.discountPrice} * {value}
            </h4>
            <h4 className="font-[600] text-[17px] pt-[3px] text-[#d02222] font-Roboto">
             ${totalPrice}
            </h4>
          </div>
          <RxCross1
            className="cursor-pointer"
            onClick={() => removeFromCartHandler(data)}
            size={50}
          />
        </div>
      </div>
    );
  };

export default Cart
