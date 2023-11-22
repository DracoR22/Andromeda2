"use client"

import styles from "@/styles/styles"
import Link from "next/link"
import Button from "../ui/Button"
import { FcGoogle } from "react-icons/fc"
import { useState } from "react"
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"
import axios from "axios"
import { server } from "@/utils/server"
import { toast } from "react-toastify"
import { redirect, useRouter } from "next/navigation"
import { signIn } from "next-auth/react"
import { useDispatch } from "react-redux"
import { loadUser } from "@/redux/actions/user"



const Login = () => {

    const [isLoading, setIsLoading] = useState(false)
    const router = useRouter()

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [visible, setVisible] = useState(false);

    const dispatch = useDispatch()

    const onSubmit = async (e: any) => {
       e.preventDefault()
       try {
        setIsLoading(true)
        await axios.post(`${server}/user/login-user`, { email, password }, { withCredentials: true })
        toast.success("Logged In!")
        router.push("/")
        dispatch(loadUser())
       } catch (error: any) {
        toast.error(error.response.data.message)
       } finally {
        setIsLoading(false)
       }
    }

    
    const handleGoogleSignIn = async () => {
        const result = await signIn('google');

        if (result?.error) {
          console.error('Google Sign-In Error:', result.error);
        } else {
          // Redirect to the homepage
          // Reload the page once the route change is complete
        }
    };
    
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Login to your account
        </h2>
      </div>
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={onSubmit}>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email address
              </label>
              <div className="mt-1">
                <input
                  type="email"
                  name="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <div className="mt-1 relative">
               <input
                  type={visible ? "text" : "password"}
                  name="password"
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
                {visible ? (
                  <AiOutlineEye
                    className="absolute right-2 top-2 cursor-pointer text-neutral-600"
                    size={25}
                    onClick={() => setVisible(false)}
                  />
                ) : (
                  <AiOutlineEyeInvisible
                    className="absolute right-2 top-2 cursor-pointer text-neutral-600"
                    size={25}
                    onClick={() => setVisible(true)}
                  />
                )}
              </div>
            </div>
            <div className={`${styles.noramlFlex} justify-between`}>
              <div className={`${styles.noramlFlex}`}>
                <input
                  type="checkbox"
                  name="remember-me"
                  id="remember-me"
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label
                  htmlFor="remember-me"
                  className="ml-2 block text-sm text-gray-900"
                >
                  Remember me
                </label>
              </div>
              <div className="text-sm">
                <a
                  href=".forgot-password"
                  className="font-medium text-blue-600 hover:text-blue-500"
                >
                  Forgot your password?
                </a>
              </div>
            </div>
            <div>
              <Button
                type="submit" isLoading={isLoading} disabled={isLoading}
                className="group relative w-full h-[40px] flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
              >
                Submit
              </Button>
            </div>

            <div className="flex items-center gap-4 mb-2">
            <hr className="flex-grow border-t border-neutral-500" />
            <div className="text-neutral-700 text-xs">Or</div>
            <hr className="flex-grow border-t border-neutral-500" />
           </div>

            <div>
              <div onClick={handleGoogleSignIn}
              className="w-full cursor-pointer flex items-center justify-center py-2 px-4 border border-black transition hover:bg-gray-200 text-sm font-medium rounded-md">
               Continue with Google 
               <span className="ml-3">
               <FcGoogle/>
               </span>
             </div>
          </div>
            <div className={`${styles.noramlFlex} w-full`}>
              <h4>Not have any account?</h4>
              <Link href="/sign-up" className="text-blue-600 pl-2">
                Sign Up
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Login
