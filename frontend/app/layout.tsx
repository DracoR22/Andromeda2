'use client'

import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { ToastContainer } from 'react-toastify'


import 'react-toastify/dist/ReactToastify.css';
import { Providers } from './Provider';
import { useEffect } from 'react'
import store from '@/redux/store'
import { loadUser } from '@/redux/actions/user'
import { SessionProvider } from 'next-auth/react'

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  useEffect(() => {
    store.dispatch(loadUser())
  }, [])

  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <SessionProvider>
      <ToastContainer autoClose={3000}/>
        {children}
        </SessionProvider>
        </Providers>
      </body>
    </html>
  )
}
