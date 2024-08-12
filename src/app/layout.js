import './globals.css'
import { Inter } from 'next/font/google'
import { Providers } from './provider'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'E-commerce App',
  description: 'Next.js 13 E-commerce App with Shadcn UI and Redux',
}

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