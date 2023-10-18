'use client'

import Image from "next/image"
import Link from "next/link"
import { AiOutlineGift } from "react-icons/ai"
import { MdOutlineLocalOffer } from "react-icons/md"
import { FiPackage, FiShoppingBag } from "react-icons/fi"
import { useSelector } from "react-redux"
import { BiMessageSquareDetail } from "react-icons/bi"
import { redirect } from "next/navigation"

interface Props {
  seller: any
}


const DashboardHeader = ({ seller }: Props) => {

  return (
    <div className="w-full h-[80px] bg-white shadow sticky top-0 left-0 z-30 flex items-center justify-between px-4">
    <div>
      <Link href="/">
        <Image src="/andromedabg.png" alt="" height={140} width={140}/>
      </Link>
    </div>
    <div className="flex items-center">
      <div className="flex items-center mr-4">
        <Link href="/dashboard/coupons" className="800px:block hidden">
          <AiOutlineGift
            size={30}
            className="mx-5 cursor-pointer hover:text-[#3bc177] transition"
          />
        </Link>
        <Link href="/dashboard-events" className="800px:block hidden">
          <MdOutlineLocalOffer
          
            size={25}
            className="mx-5 cursor-pointer hover:text-[#3bc177] transition"
          />
        </Link>
        <Link href="/dashboard-products" className="800px:block hidden">
          <FiShoppingBag
            size={25}
            className="mx-5 cursor-pointer hover:text-[#3bc177] transition"
          />
        </Link>
        <Link href="/dashboard-orders" className="800px:block hidden">
          <FiPackage size={25} className="mx-5 cursor-pointer hover:text-[#3bc177] transition" />
        </Link>
        <Link href="/dashboard-messages" className="800px:block hidden">
          <BiMessageSquareDetail
            size={25}
            className="mx-5 cursor-pointer hover:text-[#3bc177] transition"
          />
        </Link>
        <Link href={`/shop/${seller._id}`}>
        <Image src={seller.avatar?.url || "/profile.jpg"} alt="" width={40} height={40} className="w-[40px] h-[40px] rounded-full border-[3px] border-[#0eae88]"/>
        </Link>
      </div>
    </div>
  </div>
  )
}

export default DashboardHeader
