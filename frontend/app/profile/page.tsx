'use client'

import Header from "@/components/navbar/Header"
import ProfileContent from "@/components/profile/ProfileContent"
import ProfileSidebar from "@/components/profile/ProfileSidebar"
import styles from "@/styles/styles"
import { useState } from "react"

const ProfilePage = () => {

  const [active, setActive] = useState(1)

  return (
    <div>
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
