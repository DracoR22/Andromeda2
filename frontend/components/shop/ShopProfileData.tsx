'use client'

import styles from "@/styles/styles";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProductCard from "../product/ProductCard";
import { getAllProductsShop } from "@/redux/actions/product";

interface Props {
    isOwner: boolean
    id: string
}

const ShopProfileData = ({ isOwner, id }: Props) => {

    const [active, setActive] = useState(1);

    const { products, isLoading } = useSelector((state: any) => state.products);
    const dispatch = useDispatch()

    useEffect(() => {
      dispatch(getAllProductsShop(id));
    }, [dispatch]);

  return (
   <>
    {isLoading ? (
      <div>

      </div>
    ) : (
      <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <div className="w-full flex">
          <div className="flex items-center" onClick={() => setActive(1)}>
            <h5
              className={`font-[600] text-[20px] ${
                active === 1 ? "text-[#3bc177]" : "text-[#333] hover:text-[#3bc177] transition"
              } cursor-pointer pr-[20px]`}
            >
              Shop Products
            </h5>
          </div>
          <div className="flex items-center" onClick={() => setActive(2)}>
            <h5
              className={`font-[600] text-[20px] ${
                active === 2 ? "text-[#3bc177]" : "text-[#333] hover:text-[#3bc177] transition"
              } cursor-pointer pr-[20px]`}
            >
              Running Events
            </h5>
          </div>
  
          <div className="flex items-center" onClick={() => setActive(3)}>
            <h5
              className={`font-[600] text-[20px] ${
                active === 3 ? "text-[#3bc177]" : "text-[#333] hover:text-[#3bc177] transition"
              } cursor-pointer pr-[20px]`}
            >
              Shop Reviews
            </h5>
          </div>
        </div>
        <div>
          {isOwner && (
            <div>
              <Link href="/dashboard">
                <div className={`${styles.button} !rounded-xl h-[42px] mx-10 hover:bg-gray-900 transition`}>
                  <span className="text-[#fff]">Dashboard</span>
                </div>
              </Link>
            </div>
          )}
        </div>
      </div>
  
      <br />
      {active === 1 && (
        <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-3 lg:gap-[25px] xl:grid-cols-4 xl:gap-[20px] mb-12 border-0">
          {products && products.map((i: any, index: number) => (
              <ProductCard data={i} key={index} isShop={true} />
            ))}
        </div>
      )}
  
      {active === 2 && (
        <div className="w-full">
          <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-3 lg:gap-[25px] xl:grid-cols-4 xl:gap-[20px] mb-12 border-0">
            {/* {events &&
              events.map((i, index) => (
                <ProductCard
                  data={i}
                  key={index}
                  isShop={true}
                  isEvent={true}
                />
              ))} */}
          </div>
          {/* {events && events.length === 0 && (
            <h5 className="w-full text-center py-5 text-[18px]">
              No Events have for this shop!
            </h5>
          )} */}
        </div>
      )}
  
      {active === 3 && (
        <div className="w-full">
  
          {/* {allReviews && allReviews.length === 0 && (
            <h5 className="w-full text-center py-5 text-[18px]">
              No Reviews have for this shop!
            </h5>
          )} */}
        </div>
      )}
    </div>
    )}
   </>
  )
}

export default ShopProfileData
