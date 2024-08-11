'use client'

import { useDispatch } from 'react-redux'
import { addToCart } from '@/lib/features/cartSlice'
import { Button } from "@/components/ui/button"

export default function AddToCartButton({ product }) {
    const dispatch = useDispatch()

    const handleAddToCart = () => {
        dispatch(addToCart(product))
    }

    return (
        <Button onClick={handleAddToCart}>Add to Cart</Button>
    )
}