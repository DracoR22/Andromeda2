'use client'

import { categoriesData, productData } from "@/static/data"
import styles from "@/styles/styles"
import Link from "next/link"
import { useState } from "react"
import { AiOutlineHeart, AiOutlineSearch, AiOutlineShoppingCart } from "react-icons/ai"
import { IoIosArrowDown } from "react-icons/io"
import { CgProfile } from "react-icons/cg"
import DropDown from "../DropDown"
import NavItems from "./NavItems"
import Image from "next/image"

interface Props {
  activeHeading: number
}

const Header = ({ activeHeading }: Props) => {

  const [dropDown, setDropDown] = useState(false);
  const [active, setActive] = useState(false)

  const [searchTerm, setSearchTerm] = useState("")
  const [searchData, setSearchData] = useState<any[] | null>(null)

  const handleSearchChange = (e: any) => {
    const term = e.target.value
    setSearchTerm(term)

    if(term === "") {
      setSearchData(null);
    } else {
      const filteredProducts: any = productData && productData.filter((product) => 
      product.name.toLowerCase().includes(term.toLowerCase())
       )

       setSearchData(filteredProducts)
    }
  }

  window.addEventListener("scroll", () => {
    if (window.scrollY > 70) {
      setActive(true);
    } else {
      setActive(false);
    }
  });

  return (
    <div className={`${active === true ? `w-full shadow-sm fixed opacity-85 top-0 left-0 z-10` : null}
     transition ${styles.section} bg-white px-10`}>
      <div className="hidden 800px:h-[40px] 800px:my-[20px] 800px:flex items-center justify-between">
        <div>
            <Link href="/">
              <Image src="/andromedabg.png" alt="" height={140} width={140}/>
            </Link>
        </div>
        {/* SearchBar */}
        <div className="w-[20%] relative">
          <input type="text" placeholder="Search..." value={searchTerm} onChange={handleSearchChange}
          className="h-[35px] w-full px-2 border-black border-[2px] rounded-full"/>
          <AiOutlineSearch size={25} className="absolute right-2 top-1.5 cursor-pointer"/>
          {searchData && searchData.length !== 0 ? (
            <div className="absolute min-h-[30vh] bg-slate-50 shadow-sm z-30 p-4">
               {searchData && searchData.map((i, index) => {

                   const d = i.name
                   const Product_name = d.replace(/\s+/g, "-")

                    return (
                      <Link href={`/product/${Product_name}`} key={index}>
                        <div className="w-full flex items-start-py-3">
                          <img src={`${i.image_Url[0].url}`} alt="" className="w-[40px] h-[40px] mr-[10px]"/>
                          <h1 className="text-xs text-neutral-700 truncate">{i.name}</h1>
                        </div>
                      </Link>
                    );
                  })}
            </div>
          ) : null}
        </div>
        <div className="flex items-center gap-6">
          {/* CATEGORIES */}
          <div className="flex items-center cursor-pointer font-bold text-sm" onClick={() => setDropDown(!dropDown)}>
            Categories
            <IoIosArrowDown className="ml-2"/>
            {dropDown ? (
              <DropDown categoriesData={categoriesData} setDropDown={setDropDown}/>
            ) : null}
          </div>
          {/* NAV ITEMS */}
          <div>
            <NavItems active={activeHeading}/>
          </div>
          {/* ICONS */}
          <div className="flex items-center gap-2">
            <div className="relative cursor-pointer">
              <AiOutlineHeart size={25}/>
              <span className="absolute right-0 top-0 rounded-full bg-[#3bc177] w-4 h-4 p-0 m-0 text-white text-[12px] leading-tight text-center">
                0
              </span>
            </div>

            <div className="relative cursor-pointer">
              <AiOutlineShoppingCart size={25}/>
              <span className="absolute right-0 top-0 rounded-full bg-[#3bc177] w-4 h-4 p-0 m-0 text-white text-[12px] leading-tight text-center">
                1
              </span>
            </div>

            <div className="relative cursor-pointer">
              <Link href="/login">
                <CgProfile size={27}/>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Header
