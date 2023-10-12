"use client"

import { productData } from "@/static/data";
import styles from "@/styles/styles";
import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";

interface Props {
    data: any
}

const SuggestedProduct = ({ data }: Props) => {

 const [products, setProducts] = useState<any>(null);

 useEffect(() => {
    const d = productData && productData.filter((i) => i.category === data.category);
    setProducts(d);
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
           {products && products.map((i: any, index: number) => (
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
