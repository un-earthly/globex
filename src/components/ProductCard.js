'use client'

import Link from 'next/link'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import AddToCartButton from './AddToCartButton'
import AddToWishlistButton from './AddToWishlistButton'

export default function ProductCard({ product }) {
    return (
        <Link href={`/products/${product.id}`} className="hover:text-blue-600">
            <Card>
                <CardHeader>
                    <Link href={`/products/${product.id}`}>
                        <img src={product.image} alt={product.name} width={300} height={300} className="w-full h-auto" />
                    </Link>
                </CardHeader>
                <CardContent>
                    <CardTitle>
                        {product.name}
                    </CardTitle>
                    <p className="text-lg font-semibold mt-2">${product.price.toFixed(2)}</p>
                </CardContent>
                <CardFooter>
                    <AddToCartButton product={product} iconOnly />
                    <AddToWishlistButton product={product} iconOnly />
                </CardFooter>
            </Card>
        </Link>

    )
}