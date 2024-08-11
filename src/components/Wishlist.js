'use client'

import { useSelector, useDispatch } from 'react-redux'
import { removeFromWishlist } from '@/lib/features/wishlist/wishlistSlice'
import { addToCart } from '@/lib/features/cart/cartSlice'
import { Button } from "@/components/ui/button"

export default function Wishlist() {
    const dispatch = useDispatch()
    const wishlistItems = useSelector(state => state.wishlist.items)

    const handleRemove = (productId) => {
        dispatch(removeFromWishlist(productId))
    }

    const handleAddToCart = (product) => {
        dispatch(addToCart(product))
        dispatch(removeFromWishlist(product.id))
    }

    return (
        <div>
            <h2 className="text-2xl font-semibold mb-4">My Wishlist</h2>
            {wishlistItems.length === 0 ? (
                <p>Your wishlist is empty.</p>
            ) : (
                <div className="space-y-4">
                    {wishlistItems.map(item => (
                        <div key={item.id} className="flex items-center space-x-4 border-b pb-4">
                            <img src={item.image} alt={item.name} className="w-16 h-16 object-cover" />
                            <div className="flex-grow">
                                <h3 className="font-semibold">{item.name}</h3>
                                <p className="text-sm text-gray-500">${item.price.toFixed(2)}</p>
                            </div>
                            <Button onClick={() => handleAddToCart(item)}>Add to Cart</Button>
                            <Button variant="outline" onClick={() => handleRemove(item.id)}>Remove</Button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}