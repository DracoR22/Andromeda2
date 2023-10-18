'use client'

import styles from "@/styles/styles";
import { useEffect, useState } from "react";
import ProductCard from "./product/ProductCard";
import { useSelector } from "react-redux";

const BestDeals = () => {

    const [data, setData] = useState<any[]>([]);

    const { allProducts } = useSelector((state: any) => state.products);

    useEffect(() => {
      const allProductsData = allProducts ? [...allProducts] : [];
      const sortedData = allProductsData?.sort((a,b) => b.sold_out - a.sold_out); 
      const firstFive = sortedData && sortedData.slice(0, 5);
      setData(firstFive);
    }, [allProducts]);

  return (
    <div>
    <div className={`${styles.section}`}>
      <div className={`${styles.heading}`}>
        <h1 className="font-semibold text-xl mb-4 hidden sm:block">Our Best Deals!</h1>
      </div>
      <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-4 lg:gap-[25px] xl:grid-cols-5 xl:gap-[30px] mb-12 border-0">
         {
          data && data.length !== 0 && (
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
