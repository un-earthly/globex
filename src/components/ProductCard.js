'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useDispatch } from 'react-redux'
import { addToCart } from '@/lib/features/cartSlice'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'

export default function ProductCard({ product }) {
    const dispatch = useDispatch()

    const handleAddToCart = () => {
        dispatch(addToCart(product))
    }

    return (
        <Card>
            <CardHeader>
                <Link href={`/products/${product.id}`}>
                    <img src={product.image} alt={product.name} width={300} height={300} className="w-full h-auto" />
                </Link>
            </CardHeader>
            <CardContent>
                <CardTitle>
                    <Link href={`/products/${product.id}`} className="hover:text-blue-600">
                        {product.name}
                    </Link>
                </CardTitle>
                <p className="text-lg font-semibold mt-2">${product.price.toFixed(2)}</p>
            </CardContent>
            <CardFooter>
                <Button onClick={handleAddToCart}>Add to Cart</Button>
            </CardFooter>
        </Card>
    )
}