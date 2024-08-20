'use client'

import { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetAllProductsQuery } from '@/lib/features/api';
import ProductCard from '@/components/ProductCard';
import { Container } from '@/components/ui/container';

export default function ProductList() {
    const [currentPage, setCurrentPage] = useState(1);
    const limit = 20; // This matches the default limit in your API

    const {
        data,
        isLoading,
        isError,
        error
    } = useGetAllProductsQuery({ page: currentPage, limit });

    if (isLoading) {
        return <ProductListSkeleton />;
    }

    if (isError) {
        return (
            <Card>
                <CardContent className="p-6 text-center text-red-500">
                    <p className="text-lg font-semibold">Error loading products</p>
                    <p className="mt-2">{error.message || 'An unexpected error occurred'}</p>
                </CardContent>
            </Card>
        );
    }

    const { data: products, totalPages } = data;

    const paginate = (pageNumber) => setCurrentPage(pageNumber);
    const generatePaginationButtons = () => {
        const buttons = [];
        const maxVisibleButtons = 5;

        if (totalPages <= maxVisibleButtons) {
            for (let i = 1; i <= totalPages; i++) {
                buttons.push(
                    <Button
                        key={i}
                        variant={currentPage === i ? "default" : "outline"}
                        size="sm"
                        onClick={() => paginate(i)}
                    >
                        {i}
                    </Button>
                );
            }
        } else {
            buttons.push(
                <Button
                    key={1}
                    variant={currentPage === 1 ? "default" : "outline"}
                    size="sm"
                    onClick={() => paginate(1)}
                >
                    1
                </Button>
            );

            if (currentPage > 3) {
                buttons.push(<span key="ellipsis1">...</span>);
            }

            for (let i = Math.max(2, currentPage - 1); i <= Math.min(currentPage + 1, totalPages - 1); i++) {
                buttons.push(
                    <Button
                        key={i}
                        variant={currentPage === i ? "default" : "outline"}
                        size="sm"
                        onClick={() => paginate(i)}
                    >
                        {i}
                    </Button>
                );
            }

            if (currentPage < totalPages - 2) {
                buttons.push(<span key="ellipsis2">...</span>);
            }

            buttons.push(
                <Button
                    key={totalPages}
                    variant={currentPage === totalPages ? "default" : "outline"}
                    size="sm"
                    onClick={() => paginate(totalPages)}
                >
                    {totalPages}
                </Button>
            );
        }

        return buttons;
    };
    return (
        <Container>
            <div className="space-y-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {products.map(product => (
                        <ProductCard key={product._id} product={product} />
                    ))}
                </div>

                {products.length === 0 && (
                    <Card>
                        <CardContent className="p-6 text-center text-gray-500">
                            <p className="text-lg font-semibold">No products found.</p>
                            <p className="mt-2">Try adjusting your search or filters.</p>
                        </CardContent>
                    </Card>
                )}

                {totalPages > 1 && (
                    <div className="flex justify-center items-center space-x-2 mt-8">

                        {totalPages > 1 && (
                            <div className="flex justify-center items-center space-x-2 mt-8">
                                <Button
                                    variant="outline"
                                    size="icon"
                                    onClick={() => paginate(Math.max(1, currentPage - 1))}
                                    disabled={currentPage === 1}
                                >
                                    <ChevronLeft className="h-4 w-4" />
                                </Button>
                                {generatePaginationButtons()}
                                <Button
                                    variant="outline"
                                    size="icon"
                                    onClick={() => paginate(Math.min(totalPages, currentPage + 1))}
                                    disabled={currentPage === totalPages}
                                >
                                    <ChevronRight className="h-4 w-4" />
                                </Button>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </Container>
    )
}

function ProductListSkeleton() {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[...Array(8)].map((_, index) => (
                <Card key={index}>
                    <Skeleton className="h-64 w-full" />
                    <CardContent className="p-4">
                        <Skeleton className="h-4 w-2/3 mb-2" />
                        <Skeleton className="h-4 w-1/2" />
                    </CardContent>
                </Card>
            ))}
        </div>
    );
}