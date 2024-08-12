import Footer from '@/components/Footer'
import Header from '@/components/Header'
import React from 'react'

export default function HomeLayout({ children }) {
    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-grow container mx-auto px-4 py-8">
                {children}
            </main>
            <Footer />
        </div>
    )
}
