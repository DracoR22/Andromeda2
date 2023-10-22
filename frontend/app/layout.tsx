'use client'

import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { ToastContainer } from 'react-toastify'


import 'react-toastify/dist/ReactToastify.css';
import { Providers } from './Provider';
import { useEffect, useState } from 'react'
import store from '@/redux/store'
import { loadSeller, loadUser } from '@/redux/actions/user'
import { SessionProvider } from 'next-auth/react'
import LoginModal from '@/components/modals/LoginModal'
import { getAllProducts } from '@/redux/actions/product'
import { getAllEvents } from '@/redux/actions/event'
import axios from 'axios'
import { server } from '@/utils/server'

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  const [stripeApiKey, setStripeApiKey] = useState("")
  async function getStripeApiKey() {
    const { data } = await axios.get(`${server}/payment/stripeapikey`)
    setStripeApiKey(data.stripeApiKey)
  }

  useEffect(() => {
    store.dispatch(loadUser())
    store.dispatch(loadSeller())
    store.dispatch(getAllProducts());
    store.dispatch(getAllEvents());
    getStripeApiKey()
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
