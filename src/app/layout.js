'use client';

import './globals.css'
import { Inter } from 'next/font/google'
import { Providers } from './provider'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

const inter = Inter({ subsets: ['latin'] })


export default function RootLayout({ children }) {

  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}