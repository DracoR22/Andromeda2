'use client'

import { getAllProductsShop } from "@/redux/actions/product"
import styles from "@/styles/styles"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { AiFillHeart, AiOutlineHeart, AiOutlineMessage, AiOutlineShoppingCart } from "react-icons/ai"
import { useDispatch } from "react-redux"

interface Props {
    data: any
}

const ProductDetails = ({ data }: Props) => {

   const [count, setCount] = useState(1)
   const [click, setClick] = useState(false)
   const [select, setSelect] = useState(1)
   const router = useRouter()
   const dispatch = useDispatch();

  //  useEffect(() => {
  //   dispatch(getAllProductsShop(data && data?.shop._id));
  //   if (wishlist && wishlist.find((i) => i._id === data?._id)) {
  //     setClick(true);
  //   } else {
  //     setClick(false);
  //   }
  // }, [data, wishlist]);

   const incrementCount = () => {
    setCount(count + 1);
  };

  const decrementCount = () => {
    if (count > 1) {
      setCount(count - 1);
    }
  };

  const handleMessageSubmit = () => {
    router.push("/inbox?conversation=507hrehrrtertwet")
  }

  return (
    <div className="bg-white">
       {data && (
        <>
          <div className={`${styles.section} w-[90%] 800px:w-[80%]`}>
            <div className="w-full py-5">
              <div className="block w-full 800px:flex">
                <div className="w-full 800px:w-[50%]">
                 <Image src={`${data && data.images[select]?.url}`} alt="" className="w-[80%]" width={1000} height={1000}/>
                <div className="w-full flex">
                {data &&
                    data.images.map((i: any, index: number) => (
                      <div
                        className={`${
                          select === 0 ? "border" : "null"
                        } cursor-pointer`}
                      >
                        <img
                          src={`${i?.url}`}
                          alt=""
                          className="h-[150px] overflow-hidden mr-3 mt-3"
                          onClick={() => setSelect(index)}
                        />
                      </div>
                    ))}
                  <div
                    className={`${
                      select === 1 ? "border" : "null"
                    } cursor-pointer`}
                  ></div>
                  </div>
                  </div>
                <div className="w-full 800px:w-[50%] pt-5">
                  <h1 className={`${styles.productTitle}`}>
                     {data.name}
                  </h1>
                  <p className="text-sm text-neutral-600 py-2">{data.description}</p>
                  <div className="flex pt-3">
                     <h4 className={`${styles.productDiscountPrice}`}>
                      ${data.discountPrice}
                     </h4>
                     <h3 className={`${styles.price} text-red-500`}>
                       {data.originalPrice ? data.originalPrice + "$" : null}
                     </h3>
                  </div>
                  <div className="flex items-center mt-12 justify-between pr-3">
                 <div>
                   <button
                     className="bg-gradient-to-r from-teal-400 to-teal-500 text-white font-bold rounded-l px-4 py-2 shadow-lg hover:opacity-75 transition duration-300 ease-in-out"
                     onClick={decrementCount}
                   >
                     -
                   </button>
                   <span className="bg-gray-200 text-gray-800 font-medium px-4 py-[11px]">
                     {count}
                   </span>
                   <button
                     className="bg-gradient-to-r from-teal-400 to-teal-500 text-white font-bold rounded-l px-4 py-2 shadow-lg hover:opacity-75 transition duration-300 ease-in-out"
                     onClick={incrementCount}
                   >
                     +
                   </button>
                 </div>
                 <div>
                   {click ? (
                     <AiFillHeart
                       size={30}
                       className="cursor-pointer"
                    //    onClick={() => removeFromWishlistHandler(data)}
                       color={click ? "red" : "#333"}
                       title="Remove from wishlist"
                     />
                   ) : (
                     <AiOutlineHeart
                       size={30}
                       className="cursor-pointer"
                    //    onClick={() => addToWishlistHandler(data)}
                       title="Add to wishlist"
                     />
                   )}
                 </div>
                 </div>
                 <div className={`${styles.button} bg-black mt-6 rounded h-11 flex items-center`}>
                  <span className="text-white flex items-center">
                    Add to cart <AiOutlineShoppingCart className="ml-1"/>
                  </span>
                </div>
                 <div className="flex items-center pt-8">
                   <img src={data?.shop?.avatar?.url} alt="" className="w-[50px] h-[50px] rounded-full mr-2"/>
                   <div className="pr-8">
                     <h3 className={`${styles.shop_name} pb-1 pt-1`}>
                       {data.shop.name}
                     </h3>
                     <h5 className="pb-3 text-[15px]">
                       Ratings
                     </h5>
                   </div>
                   <div className={`${styles.button} bg-[#6443d1] mt-4 rounded h-11 px-3`} onClick={handleMessageSubmit}>
                     <span className="text-white flex items-center">
                       Contact Seller <AiOutlineMessage className="ml-1"/>
                     </span>
                   </div>
                 </div>
                </div>
              </div>
            </div>
            <ProductDetailsInfo data={data}/>
          </div>
        </>
       )}
    </div>
  )
}

interface ProductDetailsInfoProps {
  data: any
}

const ProductDetailsInfo = ({ data }: ProductDetailsInfoProps) => {
  const [active, setActive] = useState(1);

  return (
    <div className="bg-[#f5f6fb] px-3 800px:px-10 py-2 rounded">
      <div className="w-full flex justify-between border-b pt-10 pb-2">
        <div className="relative">
          <h5 className={"text-[#000] text-[18px] px-1 leading-5 font-[600] cursor-pointer 800px:text-[20px]"}
            onClick={() => setActive(1)}>
            Product Details
          </h5>
          {active === 1 ? (
            <div className={`border border-[#3bc177] mt-2`} />
          ) : null}
        </div>
        <div className="relative">
          <h5 className={"text-[#000] text-[18px] px-1 leading-5 font-[600] cursor-pointer 800px:text-[20px]"}
            onClick={() => setActive(2)}>
            Product Reviews
          </h5>
          {active === 2 ? (
            <div className={`border border-[#3bc177] mt-2`} />
          ) : null}
        </div>
        <div className="relative">
          <h5
            className={
              "text-[#000] text-[18px] px-1 leading-5 font-[600] cursor-pointer 800px:text-[20px]"
            }
            onClick={() => setActive(3)}
          >
            Seller Information
          </h5>
          {active === 3 ? (
            <div className={`border border-[#3bc177] mt-2`} />
          ) : null}
        </div>
      </div>
      {active === 1 ? (
        <>
          <p className="py-2 pb-10 text-sm text-neutral-600">
            {data.description}
          </p>
        </>
      ) : null}

      {active === 2 ? (
        <div className="w-full min-h-[40vh] flex flex-col items-center py-3 overflow-y-scroll">
          {data && data.reviews.map((item: any, index: number) => (
              <div className="w-full flex my-2" key={index}>
                <img
                  src={`${item.user.avatar?.url}`}
                  alt=""
                  className="w-[50px] h-[50px] rounded-full"
                />
                <div className="pl-2 ">
                  <div className="w-full flex items-center">
                    <h1 className="font-[500] mr-3">{item.user.name}</h1>
                    {/* <Ratings rating={data?.ratings} /> */} item rating
                  </div>
                  <p>{item.comment}</p>
                </div>
              </div>
            ))}

          <div className="w-full flex justify-center">
            {data && data.reviews.length === 0 && (
              <h5>No Reviews have for this product!</h5>
            )}
          </div>
        </div>
      ) : null}

      {active === 3 && (
        <div className="w-full block 800px:flex p-5">
          <div className="w-full 800px:w-[50%]">
            <Link href={`/shop/preview/${data.shop._id}`}>
              <div className="flex items-center">
                <img
                  src={`${data?.shop?.avatar?.url}`}
                  className="w-[50px] h-[50px] rounded-full"
                  alt=""
                />
                <div className="pl-3">
                  <h3 className={`${styles.shop_name}`}>{data.shop.name}</h3>
                  <h5 className="pb-2 text-[15px]">
                    {/* ({averageRating}/5) Ratings */}
                  </h5>
                </div>
              </div>
            </Link>
            <p className="pt-2">{data.shop.description}</p>
          </div>
          <div className="w-full 800px:w-[50%] mt-5 800px:mt-0 800px:flex flex-col items-end">
            <div className="text-left">
              <h5 className="font-[600]">
                Joined on:{" "}
                <span className="font-[500]">
                  {data.shop?.createdAt?.slice(0, 10)}
                </span>
              </h5>
              <h5 className="font-[600] pt-3">
                Total Products:{" "}
                <span className="font-[500]">
                  {/* {products && products.length} */} products number
                </span>
              </h5>
              <h5 className="font-[600] pt-3">
                Total Reviews:{" "}
                {/* <span className="font-[500]">{totalReviewsLength}</span> */}
              </h5>
              <Link href="/">
                <div
                  className={`${styles.button} !rounded-[4px] !h-[39.5px] mt-3`}
                >
                  <h4 className="text-white">Visit Shop</h4>
                </div>
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetails
