'use client'

import Link from "next/link"
import Image from "next/image"
import { AiOutlineGift } from "react-icons/ai"
import { MdOutlineLocalOffer } from "react-icons/md"
import { FiPackage, FiShoppingBag } from "react-icons/fi"
import { BiMessageSquareDetail } from "react-icons/bi"
import { useSelector } from "react-redux"

const AdminHeader = () => {

    const {user} = useSelector((state: any) => state.user);
     
  return (
    <div className="w-full h-[80px] bg-white shadow sticky top-0 left-0 z-30 flex items-center justify-between px-4">
      <div>
      <Link href="/">
        <Image src="/andromedabg.png" alt="" height={140} width={140}/>
      </Link>
      </div>
      <div className="flex items-center">
        <div className="flex items-center mr-4">
          <Link href="/admin/coupons" className="800px:block hidden">
            <AiOutlineGift
              color="#555"
              size={30}
              className="mx-5 cursor-pointer"
            />
          </Link>
          <Link href="/admin/events" className="800px:block hidden">
            <MdOutlineLocalOffer
              color="#555"
              size={30}
              className="mx-5 cursor-pointer"
            />
          </Link>
          <Link href="/admin/products" className="800px:block hidden">
            <FiShoppingBag
              color="#555"
              size={30}
              className="mx-5 cursor-pointer"
            />
          </Link>
          <Link href="/admin/orders" className="800px:block hidden">
            <FiPackage color="#555" size={30} className="mx-5 cursor-pointer" />
          </Link>
          <Link href="/admin/messages" className="800px:block hidden">
            <BiMessageSquareDetail
              color="#555"
              size={30}
              className="mx-5 cursor-pointer"
            />
          </Link>
            <img
              src={`${user?.avatar?.url}`}
              alt=""
              className="w-[50px] h-[50px] rounded-full object-cover"
            />
        </div>
      </div>
    </div>
  )
}

export default AdminHeader
