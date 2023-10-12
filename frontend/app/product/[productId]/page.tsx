'use client'

import Footer from "@/components/Footer"
import Header from "@/components/navbar/Header"
import ProductDetails from "@/components/product/ProductDetails"
import SuggestedProduct from "@/components/product/SuggestedProduct"
import { productData } from "@/static/data"
import { useEffect, useState } from "react"


const ProductPage = ({ params }: { params: { productId: string }}) => {

  const name = params.productId
  const [data, setData] = useState<any>(null)
  const productName = name.replace(/-/g," ")

  useEffect(() => {
    const data = productData.find((i) => i.name === productName)
    setData(data)
  }, [])

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
