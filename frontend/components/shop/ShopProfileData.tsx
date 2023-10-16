'use client'

import styles from "@/styles/styles";
import Link from "next/link";
import { useState } from "react";

interface Props {
    isOwner: boolean
}

const ShopProfileData = ({ isOwner }: Props) => {

    const [active, setActive] = useState(1);

  return (
    <div className="w-full">
    <div className="flex w-full items-center justify-between">
      <div className="w-full flex">
        <div className="flex items-center" onClick={() => setActive(1)}>
          <h5
            className={`font-[600] text-[20px] ${
              active === 1 ? "text-red-500" : "text-[#333]"
            } cursor-pointer pr-[20px]`}
          >
            Shop Products
          </h5>
        </div>
        <div className="flex items-center" onClick={() => setActive(2)}>
          <h5
            className={`font-[600] text-[20px] ${
              active === 2 ? "text-red-500" : "text-[#333]"
            } cursor-pointer pr-[20px]`}
          >
            Running Events
          </h5>
        </div>

        <div className="flex items-center" onClick={() => setActive(3)}>
          <h5
            className={`font-[600] text-[20px] ${
              active === 3 ? "text-red-500" : "text-[#333]"
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
              <div className={`${styles.button} !rounded-[4px] h-[42px]`}>
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
        {/* {products && products.map((i, index) => (
            <ProductCard data={i} key={index} isShop={true} />
          ))} */}
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
  )
}

export default ShopProfileData
