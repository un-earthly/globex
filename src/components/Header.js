'use client'

import Link from 'next/link'
import { useSelector } from 'react-redux'
import { ShoppingCart, User } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function Header() {
    const cartItemCount = useSelector(state => state.cart.items.length)

    return (
        <header className="bg-white shadow-md">
            <div className="container mx-auto px-4 py-6 flex items-center justify-between">
                <Link href="/" className="text-2xl font-bold">E-Shop</Link>
                <nav>
                    <ul className="flex space-x-4 items-center">
                        <li>
                            <Link href="/products">Products</Link>
                        </li>
                        <li>
                            <Link href="/cart" className="flex items-center">
                                <ShoppingCart className="mr-1" />
                                Cart ({cartItemCount})
                            </Link>
                        </li>
                        <li>
                            <Button asChild variant="ghost">
                                <Link href="/account" className="flex items-center">
                                    <User className="mr-1" />
                                    Account
                                </Link>
                            </Button>
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    )
}