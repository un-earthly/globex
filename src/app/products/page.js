import { fetchProducts } from '@/lib/products'
import ProductList from '@/components/ProductList'
import ProductFilters from '@/components/ProductFilters'

export default async function ProductsPage() {
    const products = await fetchProducts()

    return (
        <div className="flex flex-col md:flex-row">
            <aside className="w-full md:w-1/4 pr-8">
                <ProductFilters />
            </aside>
            <main className="w-full md:w-3/4">
                <h1 className="text-3xl font-bold mb-6">All Products</h1>
                <ProductList products={products} />
            </main>
        </div>
    )
}