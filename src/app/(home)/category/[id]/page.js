"use client"

import { useState, useEffect } from 'react';
import ProductCard from '@/components/ProductCard';
import { useGetCategoryProductsQuery } from '@/lib/features/api';
import { useRouter } from 'next/navigation'; // Use next/router to handle route-related logic
import { Loader2 } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Container } from '@/components/ui/container';

export default function Page({ params }) {
    const router = useRouter();
    const categoryId = params?.id || router.query.id; // Use params if available, otherwise fallback to router.query
    const { data, isLoading, isFetching } = useGetCategoryProductsQuery(categoryId, {
        skip: !categoryId, // Skip the query if categoryId is not defined
    });

    useEffect(() => {
        if (!categoryId) {
            // Handle the case where categoryId is not defined
            router.push('/'); // Redirect to home or a fallback page
        }
    }, [categoryId, router]);

    return (
        <Container>
            <div className="px-4 py-8">
                {isLoading ? (
                    <div className="flex justify-center items-center h-64">
                        <Loader2 className="h-8 w-8 animate-spin" />
                    </div>
                ) : (
                    <>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                            {data?.data?.map(product => (
                                <ProductCard key={product._id} product={product} />
                            ))}
                        </div>

                        {data?.data?.length === 0 && (
                            <p className="text-center text-gray-500 mt-8">No products found in this category.</p>
                        )}
                    </>
                )}
            </div>
        </Container>
    );
}
