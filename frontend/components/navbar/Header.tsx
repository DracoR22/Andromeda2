'use client'

import { categoriesData, productData } from "@/static/data"
import styles from "@/styles/styles"
import Link from "next/link"
import { useCallback, useEffect, useRef, useState } from "react"
import { AiOutlineHeart, AiOutlineSearch, AiOutlineShoppingCart } from "react-icons/ai"
import { IoIosArrowDown, IoIosArrowForward } from "react-icons/io"
import { CgProfile } from "react-icons/cg"
import DropDown from "../DropDown"
import NavItems from "./NavItems"
import Image from "next/image"
import { useSelector } from "react-redux"
import { useSession } from 'next-auth/react'
import axios from "axios"
import { server } from "@/utils/server"
import Cart from "../cart/Cart"
import Wishlist from "../wishlist/Wishlist"
import { RxCross1, RxPencil2 } from "react-icons/rx"
import { BiMenuAltLeft } from "react-icons/bi"
import { BsPencil, BsPersonGear } from "react-icons/bs"
import { useRouter } from "next/navigation"
import useLoginModal from "@/hooks/UseLoginModal"
import ClientOnly from "../ClientOnly"

interface Props {
  activeHeading?: number
}

const Header = ({ activeHeading }: Props) => {

  const { isAuthenticated, user } = useSelector((state: any) => state.user);
  const { seller } = useSelector((state: any) => state.seller)
  const { allProducts } = useSelector((state: any) => state.products)
  const { cart } = useSelector((state: any) => state.cart)
  const { wishlist } = useSelector((state: any) =>  state.wishlist)

  const [dropDown, setDropDown] = useState(false);
  const [active, setActive] = useState(false)

  const [searchTerm, setSearchTerm] = useState("")
  const [searchData, setSearchData] = useState<any[] | null>(null)

  const [openCart, setOpenCart] = useState(false)
  const [openWishlist, setOpenWishlist] = useState(false)

  const [open, setOpen] = useState(false)
  const router = useRouter()

  const loginModal = useLoginModal()

  const [shouldReload, setShouldReload] = useState(false);

  const { data } = useSession()

  useEffect(() => {
    // Check if the user is authenticated and if session data is available
    if (!user && data) {
      axios.post(`${server}/user/social-auth`, {
        email: data?.user?.email,
        name: data?.user?.name,
        avatar: data.user?.image,
      }, { withCredentials: true })
    }
  }, [user, data]);




  const handleSearchChange = (e: any) => {
    const term = e.target.value
    setSearchTerm(term)

    if(term === "") {
      setSearchData(null);
    } else {
      const filteredProducts: any = allProducts && allProducts.filter((product: any) => 
      product.name.toLowerCase().includes(term.toLowerCase())
       )

       setSearchData(filteredProducts)
    }
  }

useEffect(() => {
  window.addEventListener("scroll", () => {
    if (window.scrollY > 70) {
      setActive(true);
    } else {
      setActive(false);
    }
  });
}, [])

  return (
   <>
     <div className={`${active === true ? `w-full shadow-sm fixed opacity-85 top-0 left-0 z-10` : null}
     transition ${styles.section} bg-white px-10 border-b border-neutral-200 mb-8`}>
      <div className="hidden 800px:h-[40px] 800px:my-[20px] 800px:flex items-center justify-between">
        <div>
            <Link href="/">
              <Image src="/andromedabg.png" alt="" height={140} width={140}/>
            </Link>
        </div>
        {/* SearchBar */}
        <div className="w-[20%] relative hidden lg:block">
          <input type="text" placeholder="Search..." value={searchTerm} onChange={handleSearchChange}
          className="h-[35px] w-full px-2 border-[#BFA181] border-[2px] rounded-full"/>
          <AiOutlineSearch size={25} className="absolute right-2 top-1.5 cursor-pointer"/>
          {searchData && searchData.length !== 0 ? (
            <div className="absolute min-h-[30vh] bg-slate-50 shadow-sm z-30 p-4">
               {searchData && searchData.map((i, index) => {

                   const d = i.name
                   const Product_name = d.replace(/\s+/g, "-")

                    return (
                      <Link href={`/product/${i._id}`} key={index}>
                        <div className="w-full flex items-start-py-3 mt-2">
                          <Image src={`${i.images[0]?.url}`} alt="" width={40} height={40}
                          className="w-[40px] h-[40px] mr-[10px] object-cover"/>
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
          <div className="flex items-center cursor-pointer font-bold text-sm" onClick={() => setDropDown(!dropDown)} >
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
          <ClientOnly>
          <div className="flex items-center gap-2">
          {seller ? (
            <div className="relative cursor-pointer" onClick={() => router.push("/dashboard")}>
              <Image src={seller.avatar?.url} alt="" width={50} height={50} className="rounded-full object-cover w-[35px] h-[35px]"/>
            </div>
            ) : (
              <div className="relative cursor-pointer" onClick={() => router.push("/shop-login")}>
              <BsPersonGear size={25} title="Become a seller"/>
              </div>
            ) }

            <div className="relative cursor-pointer" onClick={() => setOpenWishlist(true)}>
              <AiOutlineHeart size={25}/>
              <span className="absolute right-0 top-0 rounded-full bg-[#3bc177] w-4 h-4 p-0 m-0 text-white text-[12px] leading-tight text-center">
                {wishlist && wishlist.length}
              </span>
            </div>

            <div className="relative cursor-pointer" onClick={() => setOpenCart(true)}>
              <AiOutlineShoppingCart size={25}/>
              <span className="absolute right-0 top-0 rounded-full bg-[#3bc177] w-4 h-4 p-0 m-0 text-white text-[12px] leading-tight text-center">
                {cart && cart.length}
              </span>
            </div>

            <div className="relative cursor-pointer">
              {user ? (
                <Link href="/profile">
                  <Image src={user.avatar?.url || "/profile.jpg"} alt="" width={40} height={40} className="rounded-full object-cover w-[40px] h-[40px]"/>
                </Link>
              ) : (
                <Link href="/login">
                <CgProfile size={27}/>
               </Link>
              )}
            </div>
          </div>
          </ClientOnly>
           {/* CART */}
           {openCart && (
            <Cart setOpenCart={setOpenCart}/>
           )}

             {/* WISHLIST */}
             {openWishlist && (
            <Wishlist setOpenWishlist={setOpenWishlist}/>
           )}
        </div>
      </div>
    </div>

    {/* MOBILE SIDEBAR */}
    <div
        className={`${active === true ? "shadow-sm fixed top-0 left-0 z-10" : null}
      w-full bg-[#fff] z-50 top-0 left-0 shadow-sm 800px:hidden`}
      >
        <div className="w-full flex items-center justify-between h-[50px]">
          <div>
            <BiMenuAltLeft
              size={40}
              className="ml-4 cursor-pointer"
              onClick={() => setOpen(true)}
            />
          </div>
          <div>
            <Link href="/">
              <img
                src="/andromedabg.png"
                alt=""
                className="mt-3 cursor-pointer h-[130px] w-[130px]"
              />
            </Link>
          </div>
          <div>
            <div
              className="relative mr-[20px] cursor-pointer"
              onClick={() => setOpenCart(true)}
            >
              <AiOutlineShoppingCart size={30} />
              <span className="absolute right-0 top-0 rounded-full bg-[#3bc177] w-4 h-4 top right p-0 m-0 text-white font-mono text-[12px]  leading-tight text-center">
                {cart && cart.length}
              </span>
            </div>
          </div>
          {/* cart popup */}
          {openCart ? <Cart setOpenCart={setOpenCart} /> : null}

          {/* wishlist popup */}
          {openWishlist ? <Wishlist setOpenWishlist={setOpenWishlist} /> : null}
        </div>

        {/* header sidebar */}
        {open && (
          <div
            className={`fixed w-full bg-[#0000005f] z-20 h-full top-0 left-0`}
          >
            <div className="fixed w-[70%] bg-[#fff] h-screen top-0 left-0 z-10 overflow-y-scroll">
              <div className="w-full justify-between flex pr-3">
                <div>
                  <div
                    className="relative mr-[15px]"
                    onClick={() => setOpenWishlist(false)}
                  >
                    <AiOutlineHeart size={30} className="mt-5 ml-3" />
                    <span className="absolute right-0 top-0 rounded-full bg-[#3bc177] w-4 h-4 top right p-0 m-0 text-white font-mono text-[12px]  leading-tight text-center">
                      {wishlist && wishlist.length}
                    </span>
                  </div>
                </div>
                <RxCross1
                  size={30}
                  className="ml-4 mt-5 cursor-pointer"
                  onClick={() => setOpen(false)}
                />
              </div>

              <div className="my-8 w-[92%] m-auto h-[40px relative]">
                <input
                  type="search"
                  placeholder="Search Product..."
                  className="h-[40px] w-full px-2 border-[#3957db] border-[2px] rounded-md"
                  value={searchTerm}
                  onChange={handleSearchChange}
                />
                {searchData && (
                  <div className="absolute bg-[#fff] z-10 shadow w-full left-0 p-3">
                    {searchData.map((i, idx) => {
                      const d = i.name;

                      const Product_name = d.replace(/\s+/g, "-");
                      return (
                        <Link href={`/product/${Product_name}`} key={idx}>
                          <div className="flex items-center">
                            <img
                              src={i.image_Url[0]?.url}
                              alt=""
                              className="w-[50px] mr-2"
                            />
                            <h5>{i.name}</h5>
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>

              <NavItems active={activeHeading} />
              <div className={`${styles.button} ml-4 !rounded-[4px] mt-4`}>
                <Link href="/shop-create">
                  <h1 className="text-[#fff] flex items-center">
                    Become a Seller <IoIosArrowForward className="ml-1" />
                  </h1>
                </Link>
              </div>
              <br />
              <br />
              <br />

              <div className="flex w-full justify-center">
                {isAuthenticated ? (
                  <div>
                    <Link href="/profile">
                      <img
                        src={`${user.avatar?.url || "/profile.jpg"}`}
                        alt=""
                        className="w-[60px] h-[60px] rounded-full border-[3px] border-[#0eae88]"
                      />
                    </Link>
                  </div>
                ) : (
                  <>
                    <Link href="/login"
                      className="text-[18px] pr-[10px] text-[#000000b7]"
                    >
                      Login /
                    </Link>
                    <Link href="/sign-up"
                      className="text-[18px] text-[#000000b7]"
                    >
                      Sign up
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    
   </>
  )
}

export default Header
