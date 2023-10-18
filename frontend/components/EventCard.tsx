'use client'

import styles from "@/styles/styles"
import Image from "next/image"
import CountDown from "./CountDown"
import Link from "next/link"

interface Props {
  active?: boolean
  data: any
}

const EventCard = ({ data, active }: Props) => {

 const addToCartHandler = (data: any) => {}

  return (
    <div className={`w-full block bg-white rounded-lg ${active ? "unset" : "mb-12"} lg:flex p-2`}>
      <div className="w-full lg:w-[50%] m-auto">
        <Image src={data.images[0]?.url || ""} alt="" width={1000} height={1000}/>
      </div>
      <div className="w-full lg:w-[50%] mx-10 flex flex-col justify-center">
        <h2 className="text-lg font-semibold">
         {data.name}
        </h2>
        <p className="text-sm text-neutral-600">
            {data.description}
        </p>
        <div className="flex py-2 justify-between">
          <div className="flex">
            <h5 className="font-[500] text-[18px] text-red-500 pr-3 line-through">
               ${data.originalPrice}
            </h5>
            <h5 className="font-semibold text-[20px]">
                ${data.discountPrice}
            </h5>
          </div>
          <span className="text-sm pr-3 font-medium text-neutral-600">
            {data.sold_out}
          </span>
        </div>
        <CountDown data={data}/>
        <br />
        <div className="flex items-center">
          <Link href={`/product/${data._id}?isEvent=true`}>
            <div className={`rounded-full bg-black p-2 px-6 border border-[#BFA181] text-[#fff] hover:bg-gray-900 transition`}>See Details</div>
          </Link>
          <div className={`rounded-full bg-black p-2 px-6 border border-[#BFA181] text-[#fff] ml-5 hover:bg-gray-900 transition`} onClick={() => addToCartHandler(data)}>Add to cart</div>
        </div>
      </div>
    </div>
  )
}

export default EventCard
