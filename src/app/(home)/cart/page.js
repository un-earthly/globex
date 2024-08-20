'use client'

import { useSelector } from 'react-redux'
import CartItem from '@/components/CartItem'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function CartPage() {
    const { items, total, discountedTotal } = useSelector(state => state.cart)

    if (items.length === 0) {
        return <div>Your cart is empty.</div>
    }

    return (
        <div>
            <h1 className="text-3xl font-bold mb-6">Your Cart</h1>
            <div className="space-y-4">
                {items.map(item => (
                    <CartItem key={item.id} item={item} />
                ))}
            </div>
            <div className="mt-8">
                <p className="text-xl font-semibold">Discounted Total: ${discountedTotal.toFixed(2)}</p>
                <p className="line-through text-gray-300">Total: ${total.toFixed(2)}</p>
                <Button asChild className="mt-4">
                    <Link href="/checkout">
                        Proceed to Checkout
                    </Link>
                </Button>
            </div>
        </div>
    )
}