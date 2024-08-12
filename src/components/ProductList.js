"use client"
import { useState, useMemo } from 'react';
import ProductCard from './ProductCard';
import { Select } from "@/components/ui/select";
import { Input } from "@/components/ui/input";

export default function ProductList({ products }) {
    const [sortBy, setSortBy] = useState('name');
    const [filterText, setFilterText] = useState('');

    const sortedAndFilteredProducts = useMemo(() => {
        return products
            .filter(product =>
                product.name.toLowerCase().includes(filterText.toLowerCase()) ||
                product.description.toLowerCase().includes(filterText.toLowerCase())
            )
            .sort((a, b) => {
                if (sortBy === 'price') {
                    return a.price - b.price;
                } else if (sortBy === 'name') {
                    return a.name.localeCompare(b.name);
                }
                return 0;
            });
    }, [products, sortBy, filterText]);

    return (
        <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {sortedAndFilteredProducts.map(product => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
            {sortedAndFilteredProducts.length === 0 && (
                <p className="text-center text-gray-500">No products found.</p>
            )}
        </div>
    )
}