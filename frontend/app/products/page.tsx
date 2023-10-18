'use client'

import Header from "@/components/navbar/Header"
import ProductCard from "@/components/product/ProductCard";
import { productData } from "@/static/data";
import styles from "@/styles/styles"
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const ProductsPage = () => {

    const searchParams = useSearchParams()
    const categoryData = searchParams.get("category")
    const {allProducts,isLoading} = useSelector((state: any) => state.products);
    const [data, setData] = useState<any>([]);

 
    useEffect(() => {
      if (categoryData === null) {
        const d = allProducts;
        setData(d);
      } else {
        const d =
        allProducts && allProducts.filter((i: any) => i.category === categoryData);
        setData(d);
      }
      //    window.scrollTo(0,0);
    }, [allProducts]);

  return (
    <div>
      <Header activeHeading={3}/>
      <br />
      <br />
      <div className={`${styles.section}`}>
       <div className="grid mx-10 grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-4 lg:gap-[25px] xl:grid-cols-5 xl:gap-[30px] mb-12">
         {data && data.map((i: any, index: number) => <ProductCard data={i} key={index} />)}
       </div>
       {data && data.length === 0 ? (
          <h1 className="text-center w-full pb-[100px] text-neutral-600">
            No products Found!
          </h1>
        ) : null}
      </div>
    </div>
  )
}

export default ProductsPage
