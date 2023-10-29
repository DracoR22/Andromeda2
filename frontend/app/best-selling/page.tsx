'use client'

import Footer from "@/components/Footer";
import CatLoader from "@/components/loaders/CatLoader";
import Header from "@/components/navbar/Header";
import ProductCard from "@/components/product/ProductCard";
import styles from "@/styles/styles";
import Heading from "@/utils/Heading";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";


const BestSellingPage = () => {

    const [data, setData] = useState<any>([]);
    const {allProducts, isLoading} = useSelector((state: any) => state.products);

    useEffect(() => {
      const allProductsData = allProducts ? [...allProducts] : [];
      const sortedData = allProductsData?.sort((a, b) => b.sold_out - a.sold_out); 
      setData(sortedData);
    }, [allProducts]);

  return (
    <>
     <Heading title={`Best Deals - Andromeda`} description="Andromeda is a platform where sellers can post and sell their products for free without restrictions"
      keywords="e-commerce"/>
    {isLoading ? (
       <CatLoader/>
     ) : (
       <div>
       <Header activeHeading={2} />
       <br />
       <br />
       <div className={`${styles.section}`}>
         <div className="grid mx-10 grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-4 lg:gap-[25px] xl:grid-cols-5 xl:gap-[30px] mb-12">
           {data && data.map((i: any, index: number) => <ProductCard data={i} key={index} />)}
         </div>
       </div>
       <Footer />
     </div>
     )
    }
    </>
  )
}

export default BestSellingPage
