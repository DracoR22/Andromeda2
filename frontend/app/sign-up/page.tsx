"use client"

import SignUp from "@/components/auth/SignUp"
import { redirect, useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { useSession } from "next-auth/react";

const SignUpPage = () => {

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
      <SignUp/>
    </div>
  )
}

export default SignUpPage
