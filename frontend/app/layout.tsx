'use client'

import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { ToastContainer } from 'react-toastify'


import 'react-toastify/dist/ReactToastify.css';
import { Providers } from './Provider';
import { useEffect } from 'react'
import store from '@/redux/store'
import { loadSeller, loadUser } from '@/redux/actions/user'
import { SessionProvider } from 'next-auth/react'
import LoginModal from '@/components/modals/LoginModal'
import { getAllProducts } from '@/redux/actions/product'
import { getAllEvents } from '@/redux/actions/event'

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  useEffect(() => {
    store.dispatch(loadUser())
    store.dispatch(loadSeller())
    store.dispatch(getAllProducts());
    store.dispatch(getAllEvents());
  }, [])

  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <SessionProvider>
            <LoginModal/>
      <ToastContainer autoClose={3000} theme='dark'/>
        {children}
        </SessionProvider>
        </Providers>
      </body>
    </html>
  )
}
