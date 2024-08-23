"use client"
import { useState } from 'react'
import { Button } from "@/components/ui/button"
import {
    LayoutDashboard,
    ShoppingCart,
    Package,
    Users,
    BarChart,
    Settings,
    Menu,
    File,
    Home,
} from "lucide-react"
import Link from 'next/link'

const Sidebar = ({ isOpen }) => (
    <aside className={`bg-gray-800 text-white w-64 min-h-screen p-4 ${isOpen ? '' : 'hidden'} md:block`}>
        <nav>
            <ul className="space-y-2">
                <li>
                    <Link href="/" className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-700">
                        <Home className="h-5 w-5" />
                        <span>Home</span>
                    </Link>
                </li>
                <li>
                    <Link href="/admin" className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-700">
                        <LayoutDashboard className="h-5 w-5" />
                        <span>Dashboard</span>
                    </Link>
                </li>
                <li>
                    <Link href="/admin/orders" className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-700">
                        <ShoppingCart className="h-5 w-5" />
                        <span>Orders</span>
                    </Link>
                </li>
                <li>
                    <Link href="/admin/products" className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-700">
                        <Package className="h-5 w-5" />
                        <span>Products</span>
                    </Link>
                </li>
                <li>
                    <Link href="/admin/category" className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-700">
                        <File className="h-5 w-5" />
                        <span>Category</span>
                    </Link>
                </li>
            </ul>
        </nav>
    </aside>
)

export default function AdminLayout({ children }) {
    const [sidebarOpen, setSidebarOpen] = useState(false)

    return (
        <div className="flex h-screen bg-gray-100">
            <Sidebar isOpen={sidebarOpen} />
            <div className="flex-1 flex flex-col overflow-hidden">
                <header className="bg-white shadow-sm z-10">
                    <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
                        <h1 className="text-2xl font-semibold text-gray-900">Admin Dashboard</h1>
                        <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setSidebarOpen(!sidebarOpen)}>
                            <Menu className="h-6 w-6" />
                        </Button>
                    </div>
                </header>
                <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100">
                    <div className="container mx-auto px-6 py-8">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    )
}