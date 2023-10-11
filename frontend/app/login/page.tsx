'use client'

import Login from "@/components/auth/Login"
import { useSelector } from "react-redux";
import { redirect } from "next/navigation"

const LoginPage = () => {

  const { isAuthenticated, user } = useSelector((state: any) => state.user);

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
