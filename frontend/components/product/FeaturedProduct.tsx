'use client'

import styles from "@/styles/styles"
import ProductCard from "./ProductCard"
import { useSelector } from "react-redux";

const FeaturedProduct = () => {

  const { allProducts } = useSelector((state: any) => state.products);

  return (
    <div>
    <div className={`${styles.section}`}>
      <div className={`${styles.heading}`}>
        <h1 className="font-semibold text-xl my-4">Featured Products</h1>
      </div>
      <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-4 lg:gap-[25px] xl:grid-cols-5 xl:gap-[30px] mb-12 border-0">
      {
          allProducts && allProducts.length !== 0 &&(
            <>
             {allProducts && allProducts.map((i: any, index: number) => <ProductCard data={i} key={index} />)}
            </>
          )
         }
      </div>
    </div>
  </div>
  )
}

export default FeaturedProduct
