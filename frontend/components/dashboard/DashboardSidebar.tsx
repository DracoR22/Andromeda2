'use client'

import Link from "next/link"
import { AiOutlineFolderAdd, AiOutlineGift } from "react-icons/ai"
import { FiPackage, FiShoppingBag } from "react-icons/fi"
import { MdOutlineLocalOffer } from "react-icons/md"
import { RxDashboard } from "react-icons/rx"
import { VscNewFile } from "react-icons/vsc"
import { CiMoneyBill, CiSettings } from "react-icons/ci"
import { BiMessageSquareDetail } from "react-icons/bi"
import { HiOutlineReceiptRefund } from "react-icons/hi"

interface Props {
    active: number
}

const DashboardSidebar = ({ active }: Props) => {
  return (
    <div className="w-full h-[90vh] bg-white shadow-sm overflow-y-scroll sticky top-0 left-0 z-10">
    {/* single item */}
    <div className="w-full flex items-center mt-2 p-4">
      <Link href="/dashboard" className="w-full flex items-center ">
        <h5 className={`hidden 800px:flex items-center gap-2  pl-2 text-[18px] font-[400] hover:text-[#3bc177] transition
         ${ active === 1 ? "text-[#3bc177]" : "text-black"}`}>
          <RxDashboard size={30} />
          Dashboard
        </h5>
      </Link>
    </div>

    <div className="w-full flex items-center p-4 ">
      <Link href="/dashboard/orders" className="w-full flex items-center ">
      
        <h5 className={`hidden 800px:flex items-center gap-2 pl-2 text-[18px] font-[400] hover:text-[#3bc177] transition
         ${active === 2 ? "text-[#3bc177]" : "text-black" }`}>
          <FiShoppingBag size={30}/>
          All Orders
        </h5>
      </Link>
    </div>

    <div className="w-full flex items-center p-4">
      <Link href="/dashboard/products" className="w-full flex items-center">
        <h5 className={`hidden 800px:flex items-center gap-2 pl-2 text-[18px] font-[400] hover:text-[#3bc177] transition
         ${active === 3 ? "text-[#3bc177]" : "text-black"}`}>
          <FiPackage size={30} />
          All Products
        </h5>
      </Link>
    </div>

    <div className="w-full flex items-center p-4">
      <Link href="/dashboard/create-product" className="w-full flex items-center">
        <h5 className={`hidden 800px:flex items-center gap-2 pl-2 text-[18px] font-[400] hover:text-[#3bc177] transition
         ${active === 4 ? "text-[#3bc177]" : "text-black"}`}>
               <AiOutlineFolderAdd size={30} />
          Create Product
        </h5>
      </Link>
    </div>

    <div className="w-full flex items-center p-4">
      <Link href="/dashboard/events" className="w-full flex items-center">
        <h5
          className={`hidden 800px:flex items-center gap-2 pl-2 text-[18px] font-[400] hover:text-[#3bc177] transition ${
            active === 5 ? "text-[#3bc177]" : "text-black"
          }`}>
            <MdOutlineLocalOffer size={30}/>
          All Events
        </h5>
      </Link>
    </div>

    <div className="w-full flex items-center p-4">
      <Link href="/dashboard/create-event" className="w-full flex items-center">
        <h5 className={`hidden 800px:flex items-center gap-2 pl-2 text-[18px] font-[400] hover:text-[#3bc177] transition
         ${active === 6 ? "text-[#3bc177]" : "text-black"}`}>
          <VscNewFile size={30} />
          Create Event
        </h5>
      </Link>
    </div>

    <div className="w-full flex items-center p-4">
      <Link href="/dashboard/withdraw" className="w-full flex items-center">
        <h5 className={`hidden 800px:flex items-center gap-2 pl-2 text-[18px] font-[400] hover:text-[#3bc177] transition
         ${active === 7 ? "text-[#3bc177]" : "text-black"}`}>
           <CiMoneyBill size={30}/>
          Withdraw
        </h5>
      </Link>
    </div>

    <div className="w-full flex items-center p-4">
      <Link href="/dashboard/messages" className="w-full flex items-center">
        <h5 className={`hidden 800px:flex items-center gap-2 pl-2 text-[18px] font-[400] hover:text-[#3bc177] transition
         ${active === 8 ? "text-[#3bc177]" : "text-black"}`}>
              <BiMessageSquareDetail size={30} />
          Shop Inbox
        </h5>
      </Link>
    </div>

    <div className="w-full flex items-center p-4">
      <Link href="/dashboard/coupons" className="w-full flex items-center">
        <h5 className={`hidden 800px:flex items-center gap-2 pl-2 text-[18px] font-[400] hover:text-[#3bc177] transition
         ${active === 9 ? "text-[#3bc177]" : "text-black"}`}>
           <AiOutlineGift size={30}/>
          Discount Codes
        </h5>
      </Link>
    </div>

    <div className="w-full flex items-center p-4">
      <Link href="/dashboard/refunds" className="w-full flex items-center">
        <h5 className={`hidden 800px:flex items-center gap-2 pl-2 text-[18px] font-[400] hover:text-[#3bc177] transition
        ${active === 10 ? "text-[#3bc177]" : "text-black"}`}>
           <HiOutlineReceiptRefund size={30}/>
          Refunds
        </h5>
      </Link>
    </div>

    <div className="w-full flex items-center p-4">
      <Link href="/settings" className="w-full flex items-center">
        <h5 className={`hidden 800px:flex items-center gap-2 pl-2 text-[18px] font-[400] hover:text-[#3bc177] transition
        ${active === 11 ? "text-[#3bc177]" : "text-black"}`}>
            <CiSettings size={30}/>
          Settings
        </h5>
      </Link>
    </div>
  </div>
  )
}

export default DashboardSidebar
