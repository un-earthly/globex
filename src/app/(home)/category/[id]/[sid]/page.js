"use client"

import ProductCard from '@/components/ProductCard';
import { Loader2 } from 'lucide-react';
import { useGetSubCategoryProductsQuery } from '@/lib/features/api';
import { Container } from '@/components/ui/container';

export default function Page({ params }) {
    const { id, sid } = params;
    console.log(sid)
    const { data, isLoading, isFetching } = useGetSubCategoryProductsQuery({ id, sid });


    return (
        <Container>
            <div className="px-4 py-8">
                <h1 className="text-3xl font-bold mb-6 text-center">
                    {data?.categoryName || `Category: ${id}`}
                </h1>

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