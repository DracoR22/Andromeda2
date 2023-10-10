'use client'

import { productData } from "@/static/data";
import styles from "@/styles/styles";
import { useEffect, useState } from "react";
import ProductCard from "./product/ProductCard";

const BestDeals = () => {

    const [data, setData] = useState([]);

    useEffect(() => {
        const d = productData && productData.sort((a, b) => b.total_sell - a.total_sell)
        const firstFive: any = d.slice(0, 5)
        setData(firstFive)
    }, [])

  return (
    <div>
    <div className={`${styles.section}`}>
      <div className={`${styles.heading}`}>
        <h1 className="font-semibold text-xl mb-2">Our Best Deals</h1>
      </div>
      <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-4 lg:gap-[25px] xl:grid-cols-5 xl:gap-[30px] mb-12 border-0">
         {
          data && data.length !== 0 &&(
            <>
             {data && data.map((i, index) => <ProductCard data={i} key={index} />)}
            </>
          )
         }
      </div>
    </div>
  </div>
  )
}

export default BestDeals
