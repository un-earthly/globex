import { fetchProductDetails } from '@/lib/products'
import AddToCartButton from '@/components/AddToCartButton.js'
import { Button } from '@/components/ui/button'
import AddToWishlistButton from '@/components/AddToWishlistButton'

export default async function ProductPage({ params }) {
    const product = await fetchProductDetails(params.id)

    if (!product) {
        return <div>Product not found</div>
    }

    return (
        <div className="grid md:grid-cols-2 gap-8">
            <div>
                <img src={product.image} alt={product.name} className="w-full h-auto" />
            </div>
            <div>
                <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
                <p className="text-2xl font-semibold mb-4">${product.price.toFixed(2)}</p>
                <p className="mb-6">{product.description}</p>
                <AddToCartButton product={product} />
                <AddToWishlistButton product={product} />
            </div>
        </div>
    )
}