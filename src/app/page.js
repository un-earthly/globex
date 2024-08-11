import { fetchFeaturedProducts } from '@/lib/products'
import ProductList from '@/components/ProductList'
import { Button } from '@/components/ui/button'

export default async function Home() {
  const featuredProducts = await fetchFeaturedProducts()

  return (
    <div>
      <section className="mb-12">
        <h1 className="text-4xl font-bold mb-4">Welcome to Our Store</h1>
        <p className="text-xl mb-4">Discover amazing products at great prices.</p>
        <Button asChild>
          <a href="/products">Shop Now</a>
        </Button>
      </section>
      <section>
        <h2 className="text-2xl font-semibold mb-6">Featured Products</h2>
        <ProductList products={featuredProducts} />
      </section>
    </div>
  )
}