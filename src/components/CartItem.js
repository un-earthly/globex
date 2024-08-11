'use client'

import { useDispatch } from 'react-redux'
import { removeFromCart, updateQuantity } from '@/lib/features/cart/cartSlice'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function CartItem({ item }) {
    const dispatch = useDispatch()

    const handleRemove = () => {
        dispatch(removeFromCart(item.id))
    }

    const handleQuantityChange = (e) => {
        const newQuantity = parseInt(e.target.value)
        if (newQuantity > 0) {
            dispatch(updateQuantity({ id: item.id, quantity: newQuantity }))
        }
    }

    return (
        <div className="flex items-center space-x-4 py-2 border-b">
            <img src={item.image} alt={item.name} className="w-16 h-16 object-cover" />
            <div className="flex-grow">
                <h3 className="font-semibold">{item.name}</h3>
                <p className="text-sm text-gray-500">${item.price.toFixed(2)} each</p>
            </div>
            <Input
                type="number"
                value={item.quantity}
                onChange={handleQuantityChange}
                className="w-16 text-center"
                min="1"
            />
            <p className="font-semibold">${(item.price * item.quantity).toFixed(2)}</p>
            <Button variant="destructive" size="sm" onClick={handleRemove}>Remove</Button>
        </div>
    )
}