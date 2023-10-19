"use client"

import { productData } from "@/static/data";
import styles from "@/styles/styles";
import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import { useSelector } from "react-redux";

interface Props {
    data: any
}

const SuggestedProduct = ({ data }: Props) => {

  const {allProducts} = useSelector((state: any) => state.products);
  const [productData,setProductData] = useState<any>();

  useEffect(() => {
    const d =
    allProducts && allProducts.filter((i: any) => i.category === data.category);
    setProductData(d);
  }, []);


  return (
    <div>
    {data ? (
      <div className={`p-4 ${styles.section}`}>
        <h2
          className={`${styles.heading} text-[25px] font-[500] border-b mb-5`}
        >
          Related Products
        </h2>
        <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-4 lg:gap-[25px] xl:grid-cols-5 xl:gap-[30px] mb-12">
           {productData && productData.map((i: any, index: number) => (
                  <ProductCard data={i} key={index} />
              ))
           }
    </div>
      </div>
    ) : null}
  </div>
  )
}

export default SuggestedProduct
