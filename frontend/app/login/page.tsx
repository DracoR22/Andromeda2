'use client'

import Login from "@/components/auth/Login"
import { useSelector } from "react-redux";
import { redirect, useRouter } from "next/navigation"
import { useSession } from "next-auth/react";

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
      <Login/>
    </div>
  )
}

export default LoginPage
