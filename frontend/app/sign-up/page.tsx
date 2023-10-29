"use client"

import SignUp from "@/components/auth/SignUp"
import { redirect, useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { useSession } from "next-auth/react";
import Heading from "@/utils/Heading";

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
      <Heading title={`Register - Andromeda`} description="Andromeda is a platform where sellers can post and sell their products for free without restrictions"
      keywords="e-commerce"/>
      <SignUp/>
    </div>
  )
}

export default SignUpPage
