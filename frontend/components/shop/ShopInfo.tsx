'use client'

import Image from "next/image"
import { useDispatch, useSelector } from "react-redux"
import CatLoader from "../loaders/CatLoader"
import styles from "@/styles/styles"
import Link from "next/link"
import axios from "axios"
import { server } from "@/utils/server"
import { redirect, useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { getAllProductsShop } from "@/redux/actions/product"

interface Props {
    isOwner: boolean
    seller?: any
    id?: string
}

const ShopInfo = ({ isOwner, seller, id }: Props) => {

   const router = useRouter()
   const { products } = useSelector((state: any) => state.products);
   const dispatch = useDispatch();

   const [isLoading,setIsLoading] = useState(false);
   const [data, setData] = useState<any>({});

   
  useEffect(() => {
    dispatch(getAllProductsShop(id));
    setIsLoading(true);
    axios.get(`${server}/shop/get-shop-info/${id}`).then((res) => {
     setData(res.data.shop);
     setIsLoading(false);
    }).catch((error) => {
      console.log(error);
      setIsLoading(false);
    })
  }, [])


    const logoutHandler = async () => {
        axios.get(`${server}/shop/logout`,{
          withCredentials: true,
        });
        
          window.location.reload();
        
      };

      
  const totalReviewsLength = products && products.reduce((acc: number, product: any) => acc + product.reviews.length, 0);

  const totalRatings = products && products.reduce((acc: number, product: any) => acc + product.reviews.reduce((sum: number, review: any) => sum + review.rating, 0),0);

  const averageRating = totalRatings / totalReviewsLength || 0;


  return (
    <>
        <div className="w-full py-5">
        <div className="w-full flex item-center justify-center">
          <img src={data.avatar?.url || ''} alt="" 
          className="w-[150px] h-[150px] object-cover rounded-full"/>
        </div>
        <h3 className="text-center py-2 text-[20px] font-semibold">
            {data.name}
        </h3>
        <p className=" text-[#000000a6] p-[10px] flex items-center px-2">
            {data.description}
        </p>
      </div>
      <div className="p-3">
        <h5 className="font-[600]">Address</h5>
        <h4 className="text-[#000000a6]">{data.address}</h4>
      </div>
      <div className="p-3">
        <h5 className="font-[600]">Phone Number</h5>
        <h4 className="text-[#000000a6]">{data.phoneNumber}</h4>
      </div>
      <div className="p-3">
        <h5 className="font-[600]">Total Products</h5>
        <h4 className="text-[#000000a6]">{products && products.length}</h4>
      </div>
      <div className="p-3">
        <h5 className="font-[600]">Shop Ratings</h5>
        <h4 className="text-[#000000b0]">{averageRating}/5</h4>
      </div>
      <div className="p-3">
        <h5 className="font-[600]">Joined On</h5>
        <h4 className="text-[#000000b0]">{data?.createdAt?.slice(0, 10)}</h4>
      </div>
      {isOwner && (
        <div className="py-3 px-4">
           <Link href="/settings">
           <div className={`flex items-center justify-center w-full h-[42px] rounded-full mb-6 bg-[#3bc177] hover:bg-[#3b9764] transition`}>
            <span className="text-white">Edit Shop</span>
          </div>
           </Link>
          <div className={`flex cursor-pointer items-center justify-center w-full h-[42px] rounded-full mb-6 bg-[#3bc177] hover:bg-[#3b9764] transition`}
          onClick={logoutHandler}
          >
            <span className="text-white">Log Out</span>
          </div>
        </div>
      )}
    </>
  )
}

export default ShopInfo
