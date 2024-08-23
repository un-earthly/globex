"use client"

import ProductCard from '@/components/ProductCard';
import { Loader2 } from 'lucide-react';
import { useGetSubCategoryProductsQuery } from '@/lib/features/api';
import { Container } from '@/components/ui/container';
import { useRouter } from 'next/navigation';

export default function Page({ params }) {
    const router = useRouter();
    const { id, sid } = params || router.query; // Fallback to router.query if params is undefined

    const { data, isLoading } = useGetSubCategoryProductsQuery({ id, sid }, {
        skip: !id || !sid, // Skip the query if id or sid is not defined
    });

    // Handle case when id or sid is missing
    if (!id || !sid) {
        return (
            <Container>
                <div className="px-4 py-8">
                    <p className="text-center text-red-500 mt-8">Category or Subcategory not found.</p>
                </div>
            </Container>
        );
    }

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
                            <p className="text-center text-gray-500 mt-8">No products found in this subcategory.</p>
                        )}
                    </>
                )}
            </div>
        </Container>
    );
}
