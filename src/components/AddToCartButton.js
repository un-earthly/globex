'use client'

import { useDispatch, useSelector } from 'react-redux'
import { addToCart } from '@/lib/features/cartSlice'
import { Button } from "@/components/ui/button"
import { ShoppingCart } from 'lucide-react'

export default function AddToCartButton({ product, iconOnly = false }) {
    const dispatch = useDispatch()
    const cartItems = useSelector((state) => state.cart.items);
    const isInCart = cartItems.some(item => item._id === product._id);


    const handleAddToCart = () => {
        dispatch(addToCart(product))
    }

    return (
        <Button
            variant={isInCart ? "secondary" : "outline"}
            className="ml-4"
            onClick={handleAddToCart}
            disabled={isInCart}
        >
            <ShoppingCart className={`h-4 w-4 ${iconOnly ? '' : 'mr-2'}`} fill={isInCart ? "currentColor" : "none"} />
            {!iconOnly && (isInCart ? 'In Cart' : 'Add to Cart')}
        </Button>
    )
}