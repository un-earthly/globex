'use client'

import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { removeFromCart, updateQuantity } from '@/lib/features/cartSlice'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Plus, Minus } from 'lucide-react'

export default function CartItem({ item }) {
    const dispatch = useDispatch()
    const [quantity, setQuantity] = useState(item.quantity)

    useEffect(() => {
        setQuantity(item.quantity)
    }, [item.quantity])

    const handleRemove = () => {
        dispatch(removeFromCart(item._id))
    }

    const handleQuantityChange = (e) => {
        const newQuantity = parseInt(e.target.value)
        if (!isNaN(newQuantity) && newQuantity > 0) {
            setQuantity(newQuantity)
            dispatch(updateQuantity({ id: item._id, quantity: newQuantity }))
        }
    }

    const handleIncrement = () => {
        const newQuantity = quantity + 1
        setQuantity(newQuantity)
        dispatch(updateQuantity({ id: item._id, quantity: newQuantity }))
    }

    const handleDecrement = () => {
        if (quantity > 1) {
            const newQuantity = quantity - 1
            setQuantity(newQuantity)
            dispatch(updateQuantity({ id: item._id, quantity: newQuantity }))
        }
    }

    return (
        <div className="flex items-center space-x-4 py-2 border-b">
            <img src={item.productImage && item.productImage.length > 0 ? item.productImage[0] : ""} alt={item.name} className="w-16 h-16 object-cover" />
            <div className="flex-grow">
                <h3 className="font-semibold">{item?.name}</h3>
                <p className="text-sm text-gray-500">${item.sellingPrice?.toFixed(2)} each</p>
                {item.price && (
                    <span className="text-lg text-gray-500 line-through">${item?.price}</span>
                )}
            </div>
            <div className="flex items-center space-x-2">
                <Button variant="outline" size="icon" onClick={handleDecrement}>
                    <Minus className="h-4 w-4" />
                </Button>
                <Input
                    type="number"
                    value={quantity}
                    onChange={handleQuantityChange}
                    className="w-16 text-center"
                    min="1"
                />
                <Button variant="outline" size="icon" onClick={handleIncrement}>
                    <Plus className="h-4 w-4" />
                </Button>
            </div>
            <p className="font-semibold w-24 text-right">${(item.sellingPrice * quantity).toFixed(2)}</p>
            <Button variant="destructive" size="sm" onClick={handleRemove}>Remove</Button>
        </div>
    )
}