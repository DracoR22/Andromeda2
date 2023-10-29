import { footerProductLinks, footerSupportLinks, footercompanyLinks } from "@/static/data";
import Image from "next/image";
import Link from "next/link";
import { AiFillFacebook, AiFillInstagram, AiFillYoutube, AiOutlineTwitter } from "react-icons/ai";

const Footer = () => {
  return (
    <div >
     
      <div className="grid grid-cols-1 sm:gird-cols-3 lg:grid-cols-4 gap-6 sm:px-8 px-5 py-16 sm:text-center">
        <ul className="px-5 text-center sm:text-start flex sm:block flex-col items-center">
           <div>
           <Image src="/andromedabg.png" alt="" height={140} width={140}/>
           </div>
          <p className=" text-sm">The home and elements needeed to create beatiful products.</p>
          <div className="flex items-center mt-[15px]">
            <AiFillFacebook size={25} className="cursor-pointer" />
            <AiOutlineTwitter
              size={25}
              style={{ marginLeft: "15px", cursor: "pointer" }}
            />
            <AiFillInstagram
              size={25}
              style={{ marginLeft: "15px", cursor: "pointer" }}
            />
            <AiFillYoutube
              size={25}
              style={{ marginLeft: "15px", cursor: "pointer" }}
            />
          </div>
        </ul>

        <ul className="text-center sm:text-start">
          <h1 className="mb-1 font-semibold">Company</h1>
          {footerProductLinks.map((link: any,index) => (
            <li key={index}>
              <Link
                className="text-neutral-600 hover:text-teal-400 duration-300
                   text-sm cursor-pointer leading-6"
                href={""}
              >
                {link.name}
              </Link>
            </li>
          ))}
        </ul>

        <ul className="text-center sm:text-start">
          <h1 className="mb-1 font-semibold">Shop</h1>
          {footercompanyLinks.map((link: any,index) => (
            <li key={index}>
              <Link
                className="text-neutral-600 hover:text-teal-400 duration-300
                   text-sm cursor-pointer leading-6"
                href={""}
              >
                {link.name}
              </Link>
            </li>
          ))}
        </ul>

        <ul className="text-center sm:text-start">
          <h1 className="mb-1 font-semibold">Support</h1>
          {footerSupportLinks.map((link: any,index) => (
            <li key={index}>
              <Link
                className="text-neutral-600 hover:text-teal-400 duration-300
                   text-sm cursor-pointer leading-6"
                href={""}
              >
                {link.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10
         text-center pt-2 text-neutral-600 text-sm pb-8"
      >
        <span>© 2020 Andromeda. All rights reserved.</span>
        <span>Terms · Privacy Policy</span>
        <div className="sm:block flex items-center justify-center w-full">
          <img
            src="https://hamart-shop.vercel.app/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Ffooter-payment.a37c49ac.png&w=640&q=75"
            alt=""
          />
        </div>
      </div>
    </div>
  )
}

export default Footer
