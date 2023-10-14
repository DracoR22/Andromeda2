import { navItems } from "@/static/data"
import styles from "@/styles/styles"
import Link from "next/link"

interface Props {
    active?: number
}

const NavItems = ({ active }: Props) => {
  return (
    <div className={`block 800px:flex 800px:items-center gap-6`}>
      {navItems && navItems.map((i, index) => (
        <div key={index} >
            <Link href={i.url} className={`${active === index + 1 ? "border-b-[2px] border-[#BFA181] pb-2" : "text-black"} mx-8 800px:mx-0 mb-[30px] 800px:mb-0  800px:pb-2 cursor-pointer font-bold text-sm hover:border-b-[2px] hover:border-[#BFA181] transition`}>
              {i.title}
            </Link>
        </div>
      ))}
    </div>
  )
}

export default NavItems
