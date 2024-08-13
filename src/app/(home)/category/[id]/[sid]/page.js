"use client"

import { useState, useMemo, useEffect } from 'react';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import ProductCard from '@/components/ProductCard';
import { fetchProducts } from '@/lib/products'; // Adjust the import path as necessary

export default function Page({ params }) {
    const { id, sid } = params;
    const [products, setProducts] = useState([]);
    const [sortBy, setSortBy] = useState('name');
    const [filterText, setFilterText] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadProducts = async () => {
            setLoading(true);
            try {
                const fetchedProducts = await fetchProducts();
                setProducts(fetchedProducts);
            } catch (error) {
                console.error('Failed to fetch products:', error);
            } finally {
                setLoading(false);
            }
        };

        loadProducts();
    }, [id, sid]); // id and sid are included in case you want to filter by these in the future

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

    if (loading) {
        return <div className="text-center">Loading products...</div>;
    }

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">
                Category: {id} - Subcategory: {sid}
            </h1>
            <div className="flex gap-4 mb-4">
                <Select
                    value={sortBy}
                    onValueChange={setSortBy}
                >
                    <SelectTrigger className="w-40">
                        <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="name">Sort by Name</SelectItem>
                        <SelectItem value="price">Sort by Price</SelectItem>
                    </SelectContent>
                </Select>
                <Input
                    type="text"
                    placeholder="Filter products..."
                    value={filterText}
                    onChange={(e) => setFilterText(e.target.value)}
                    className="flex-grow"
                />
            </div>
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
        </div>
    );
}