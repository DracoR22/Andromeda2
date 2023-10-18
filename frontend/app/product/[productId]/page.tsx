'use client'

import Footer from "@/components/Footer"
import Header from "@/components/navbar/Header"
import ProductDetails from "@/components/product/ProductDetails"
import SuggestedProduct from "@/components/product/SuggestedProduct"
import { productData } from "@/static/data"
import { useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"


const ProductPage = ({ params }: { params: { productId: string }}) => {

  const searchParams = useSearchParams()

  const { allProducts } = useSelector((state: any) => state.products);
  const { allEvents } = useSelector((state: any) => state.events);

  const id = params.productId
  const [data, setData] = useState<any>(null)
  const eventData = searchParams.get("isEvent");
  
  useEffect(() => {
    if (eventData !== null) {
      const data = allEvents && allEvents.find((i: any) => i._id === id);
      setData(data);
    } else {
      const data = allProducts && allProducts.find((i: any) => i._id === id);
      setData(data);
    }
  }, [allProducts, allEvents]);

  console.log(data)


  return (
    <div>
      <Header/>
        <ProductDetails data={data}/>
        {data && <SuggestedProduct data={data}/>}
      <Footer/>
   </div>
  )
}

export default ProductPage
