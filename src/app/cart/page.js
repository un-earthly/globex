'use client'

import { useSelector } from 'react-redux'
import CartItem from '@/components/CartItem'
import { Button } from '@/components/ui/button'

export default function CartPage() {
    const { items, total } = useSelector(state => state.cart)

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
                <p className="text-xl font-semibold">Total: ${total.toFixed(2)}</p>
                <Button className="mt-4">Proceed to Checkout</Button>
            </div>
        </div>
    )
}