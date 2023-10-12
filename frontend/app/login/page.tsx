'use client'

import Login from "@/components/auth/Login"
import { useSelector } from "react-redux";
import { redirect } from "next/navigation"
import { useSession } from "next-auth/react";

const LoginPage = () => {

  const { isAuthenticated, user } = useSelector((state: any) => state.user);
  const { data } = useSession()

  if(user) {
    redirect("/")
  }

  return (
    <div>
      <Login/>
    </div>
  )
}

export default LoginPage
