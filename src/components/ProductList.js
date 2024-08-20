import ProductCard from './ProductCard';
import { Card, CardContent } from "@/components/ui/card";

export default function ProductList({ products }) {


    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {products?.map(product => (
                    <ProductCard key={product._id} product={product} />
                ))}
            </div>

            {products?.length === 0 && (
                <Card>
                    <CardContent className="p-4 text-center text-gray-500">
                        No products found.
                    </CardContent>
                </Card>
            )}
        </div>
    )
}