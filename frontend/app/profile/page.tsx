'use client'

import Header from "@/components/navbar/Header"
import ProfileContent from "@/components/profile/ProfileContent"
import ProfileSidebar from "@/components/profile/ProfileSidebar"
import styles from "@/styles/styles"
import { useState } from "react"
import { useSelector } from "react-redux"
import { redirect } from "next/navigation"
import Heading from "@/utils/Heading"

const ProfilePage = () => {

  const [active, setActive] = useState(1)
  const { user, isLoading } = useSelector((state: any) => state.user);

  if(!user) {
    redirect("/")
  }

  return (
    <div>
      <Heading title={`${user.name} - Andromeda`} description="Andromeda is a platform where sellers can post and sell their products for free without restrictions"
      keywords="e-commerce"/>
      <Header/>
      <div className={`${styles.section} flex bg-neutral-200 py-10`}>
         <div className="w-[335px]">
           <ProfileSidebar active={active} setActive={setActive}/>
         </div>
         <ProfileContent active={active}/>
      </div>
    </div>
  )
}

export default ProfilePage
