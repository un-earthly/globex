import BackToTopButton from '@/components/BackToTopButton'
import Footer from '@/components/Footer'
import dynamic from 'next/dynamic'
const Header = dynamic(() => import('../../components/Header'), {
    ssr: false,
})
import React from 'react'

export default function HomeLayout({ children }) {
    return (
        <div className="flex flex-col min-h-screen relative">
            <Header />
            <main className="flex-grow mx-auto  py-8">
                {children}
            </main>

            <Footer />
            <BackToTopButton />
        </div>
    )
}
