'use client'

import Login from "@/components/auth/Login"
import { useSelector } from "react-redux";
import { redirect, useRouter } from "next/navigation"
import { useSession } from "next-auth/react";
import Heading from "@/utils/Heading";

const LoginPage = () => {

  const { isAuthenticated, user } = useSelector((state: any) => state.user);
  const { data } = useSession()

  const router= useRouter()

  if(user || data) {
    router.push("/")
    setTimeout(() => {
      window.location.reload();
    }, 3000);
  }

  return (
    <div>
      <Heading title={`Login - Andromeda`} description="Andromeda is a platform where sellers can post and sell their products for free without restrictions"
      keywords="e-commerce"/>
      <Login/>
    </div>
  )
}

export default LoginPage
