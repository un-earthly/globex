'use client'

import { useGetProductDetailsQuery } from '@/lib/features/api' // Adjust this import path as needed
import AddToCartButton from '@/components/AddToCartButton'
import AddToWishlistButton from '@/components/AddToWishlistButton'
import { Card, CardContent } from "@/components/ui/card"
import Image from 'next/image'
import { Skeleton } from '@/components/ui/skeleton'

export default function ProductPage({ params }) {
    const { data: product, isLoading, isError, error } = useGetProductDetailsQuery({
        productId: params.id
    })

    if (isLoading) {
        return <ProductSkeleton />
    }

    if (isError) {
        return (
            <Card className="max-w-2xl mx-auto mt-10">
                <CardContent className="p-6 text-center text-red-500">
                    <p className="text-lg font-semibold">Error loading product</p>
                    <p className="mt-2">{error.message || 'An unexpected error occurred'}</p>
                </CardContent>
            </Card>
        )
    }

    if (!product) {
        return (
            <Card className="max-w-2xl mx-auto mt-10">
                <CardContent className="p-6 text-center text-gray-500">
                    <p className="text-lg font-semibold">Product not found</p>
                </CardContent>
            </Card>
        )
    }

    return (
        <div className="max-w-6xl mx-auto px-4 py-8">
            <div className="grid md:grid-cols-2 gap-8">
                <div className="relative aspect-square">
                    {product.data.productImage && product.data.productImage.length > 0 && (
                        <img
                            src={product.data.productImage[0]}
                            alt={product.data.productName}
                            objectFit="cover"
                            className="rounded-lg"
                        />
                    )}
                </div>
                <div>
                    <h1 className="text-3xl font-bold mb-2">{product.data.productName}</h1>
                    <p className="text-xl font-semibold mb-2">{product.data.brandName}</p>
                    <p className="text-2xl font-semibold mb-2">
                        ${product.data.sellingPrice.toFixed(2)}
                        {product.data.price !== product.data.sellingPrice && (
                            <span className="text-lg line-through text-gray-500 ml-2">
                                ${product.data.price.toFixed(2)}
                            </span>
                        )}
                    </p>
                    <p className="mb-4">{product.data.description}</p>
                    <p className="mb-4">Category: {product.data.category.name}</p>
                    <p className="mb-6">Subcategory: {product.data.subcategory}</p>
                    <div className="space-y-4">
                        <AddToCartButton product={product} />
                        <AddToWishlistButton product={product} />
                    </div>
                </div>
            </div>
        </div>
    )
}

function ProductSkeleton() {
    return (
        <div className="max-w-6xl mx-auto px-4 py-8">
            <div className="grid md:grid-cols-2 gap-8">
                <Skeleton className="aspect-square w-full" />
                <div className="space-y-4">
                    <Skeleton className="h-10 w-3/4" />
                    <Skeleton className="h-8 w-1/2" />
                    <Skeleton className="h-8 w-1/4" />
                    <Skeleton className="h-24 w-full" />
                    <Skeleton className="h-6 w-1/3" />
                    <Skeleton className="h-6 w-1/3" />
                    <Skeleton className="h-10 w-full" />
                    <Skeleton className="h-10 w-full" />
                </div>
            </div>
        </div>
    )
}