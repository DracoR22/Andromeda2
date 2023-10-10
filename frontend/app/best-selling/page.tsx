'use client'

import Header from "@/components/navbar/Header";
import ProductCard from "@/components/product/ProductCard";
import { productData } from "@/static/data";
import styles from "@/styles/styles";
import { useEffect, useState } from "react";


const BestSellingPage = () => {

    const [data, setData] = useState<any>([]);

    useEffect(() => {
          const d = productData && productData.sort((a, b) => b.total_sell - a.total_sell);
          setData(d);
      }, [productData]);

  return (
    <div>
    <Header activeHeading={2}/>
    <br />
    <br />
    <div className={`${styles.section}`}>
     <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-4 lg:gap-[25px] xl:grid-cols-5 xl:gap-[30px] mb-12">
       {data && data.map((i: any, index: number) => <ProductCard data={i} key={index} />)}
     </div>
    </div>
  </div>
  )
}

export default BestSellingPage
