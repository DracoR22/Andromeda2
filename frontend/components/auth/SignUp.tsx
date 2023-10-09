'use client'

import styles from '@/styles/styles'
import Link from 'next/link'
import React from 'react'
import { FcGoogle } from "react-icons/fc"
import { useState } from "react"
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"
import Button from '../ui/Button'
import { RxAvatar } from "react-icons/rx"
import Image from 'next/image'
import axios from 'axios'
import { server } from '@/utils/server'
import { useRouter } from 'next/navigation'
import { toast } from "react-toastify"

const SignUp = () => {

    const [isLoading, setIsLoading] = useState(false)
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [visible, setVisible] = useState(false);
    const [avatar, setAvatar] = useState<string | null>(null);

    const router = useRouter()

    // UPLOAD USER IMAGE
    const handleFileInputChange = (e: any) => {
        const reader = new FileReader();
    
        reader.onload = () => {
          if (reader.readyState === 2) {
            setAvatar(reader.result as string);
          }
        };
    
        reader.readAsDataURL(e.target.files[0]);
      };

      // Register
      const handleSubmit = async (e: any) => {
        e.preventDefault()
        try {
          setIsLoading(true)
          await axios.post(`${server}/user/create-user`, { name, email, password, avatar })
          toast.success("An activation code has been sent to your email")
          router.push("/login")
        } catch (error: any) {
          toast.error(error.response.data.message)
        } finally {
          setIsLoading(false)
        }
      }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
    <div className="sm:mx-auto sm:w-full sm:max-w-md">
      <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
        Register as a new user
      </h2>
    </div>
    <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            {/* NAME FIELD */}
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Full Name
            </label>
            <div className="mt-1">
              <input
                type="text"
                name="text"
                autoComplete="name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>
          </div>

          {/* EMAIL FIELD */}
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

          {/* PASSWORD FIELD */}
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
                  className="absolute right-2 top-2 cursor-pointer"
                  size={25}
                  onClick={() => setVisible(false)}
                />
              ) : (
                <AiOutlineEyeInvisible
                  className="absolute right-2 top-2 cursor-pointer"
                  size={25}
                  onClick={() => setVisible(true)}
                />
              )}
            </div>
          </div>

          {/* PROFILE PICTUE FIELD */}
          <div>
            <label
              htmlFor="avatar"
              className="block text-sm font-medium text-gray-700"
            ></label>
            <div className="mt-2 flex items-center">
              <span className="inline-block h-8 w-8 rounded-full overflow-hidden">
                {avatar ? (
                  <Image src={avatar} alt="avatar" className="h-full w-full object-cover rounded-full"height={40} width={40}/>
                ) : (
                  <RxAvatar className="h-8 w-8" />
                )}
              </span>
              <label
                htmlFor="file-input"
                className="ml-5 flex items-center cursor-pointer justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
              >
                <span>Upload a file</span>
                <input
                  type="file"
                  name="avatar"
                  id="file-input"
                  accept=".jpg,.jpeg,.png"
                  onChange={handleFileInputChange}
                  className="sr-only"
                />
              </label>
            </div>
          </div>

          <div>
            <Button
              type="submit" isLoading={isLoading}
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
             <Button
              className="w-full flex items-center justify-center py-2 px-4 border border-black transition hover:bg-gray-200 text-sm font-medium rounded-md">
               Continue with Google 
               <span className="ml-3">
               <FcGoogle/>
               </span>
             </Button>
          </div>

          <div className={`${styles.noramlFlex} w-full`}>
            <h4>Already have an account?</h4>
            <Link href="/login" className="text-blue-600 pl-2">
              Sign In
            </Link>
          </div>
        </form>
      </div>
    </div>
  </div>
  )
}

export default SignUp
