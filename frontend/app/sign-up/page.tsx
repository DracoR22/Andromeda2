"use client"

import SignUp from "@/components/auth/SignUp"
import { redirect } from "next/navigation";
import { useSelector } from "react-redux";

const SignUpPage = () => {

  const { isAuthenticated, user } = useSelector((state: any) => state.user);

  if(user) {
    redirect("/")
  }

  return (
    <div>
      <SignUp/>
    </div>
  )
}

export default SignUpPage
