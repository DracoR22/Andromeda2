import { navItems } from "@/static/data"
import Link from "next/link"

interface Props {
    active: number
}

const NavItems = ({ active }: Props) => {
  return (
    <div className="flex items-center gap-6">
      {navItems && navItems.map((i, index) => (
        <div key={index} >
            <Link href={i.url} className={`${active === index + 1 ? "border-b-[2px] border-[#BFA181] pb-2" : "text-black"} cursor-pointer font-bold text-sm hover:border-b-[2px] hover:border-[#BFA181] pb-2 transition`}>
              {i.title}
            </Link>
        </div>
      ))}
    </div>
  )
}

export default NavItems
