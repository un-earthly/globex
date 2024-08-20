"use client"

import { useState } from 'react';
import ProductCard from '@/components/ProductCard';
import { useGetCategoryProductsQuery } from '@/lib/features/api';
import { useSelector } from "react-redux";
import { Loader2 } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Container } from '@/components/ui/container';

export default function Page({ params }) {
    const { id } = params;
    // const [page, setPage] = useState(1);
    const { data, isLoading, isFetching } = useGetCategoryProductsQuery(id);
    // const hasMore = useSelector(state => state.products.hasMore);

    // const loadMore = () => {
    //     if (hasMore && !isFetching) {
    //         setPage(prevPage => prevPage + 1);
    //     }
    // };

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

                        {/* {hasMore && (
                        <div className="mt-8 text-center">
                            <Button
                                onClick={loadMore}
                                disabled={isFetching}
                                className="px-6 py-2"
                            >
                                {isFetching ? (
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        Loading...
                                    </>
                                ) : (
                                    'Load More'
                                )}
                            </Button>
                        </div>
                    )} */}
                    </>
                )}
            </div>
        </Container>
    );
}