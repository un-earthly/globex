'use client'

import * as React from "react"
import Link from 'next/link'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import AddToCartButton from './AddToCartButton'
import AddToWishlistButton from './AddToWishlistButton'

export default function ProductCard({ product }) {
    return (
        <Card className="overflow-hidden shadow-lg transition-all duration-300 hover:shadow-xl">
            <Link href={`/products/${product._id}`}>
                <Carousel className="w-full">
                    <CarouselContent>
                        {product.productImage.map((image, index) => (
                            <CarouselItem key={index}>
                                <div className="h-64">
                                    <img
                                        src={image}
                                        alt={`${product.productName} - Image ${index + 1}`}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                    <CarouselPrevious />
                    <CarouselNext />
                </Carousel>
                <CardContent className="p-4">
                    <h3 className="text-lg font-semibold truncate">{product.productName}</h3>
                    <p className="text-sm text-gray-600 mt-1 truncate">{product.brandName}</p>
                    <div className="mt-2">
                        {product.sellingPrice > 0 ? (
                            <>
                                <span className="text-lg font-bold text-green-600">
                                    ${product.sellingPrice.toFixed(2)}
                                </span>
                                <span className="text-sm text-gray-500 line-through ml-2">
                                    ${product.price.toFixed(2)}
                                </span>
                            </>
                        ) : (
                            <span className="text-lg font-bold">${product.price.toFixed(2)}</span>
                        )}
                    </div>
                </CardContent>
            </Link>
            <CardFooter className="p-4 flex justify-between">
                <AddToCartButton product={product} />
                <AddToWishlistButton product={product} />
            </CardFooter>
        </Card>
    )
}