import { generateProduct } from './faker'

export async function fetchFeaturedProducts() {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    return Array(8).fill().map(() => generateProduct())
}

export async function fetchProducts() {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    return Array(20).fill().map(() => generateProduct())
}

export async function fetchProductDetails(id) {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    const product = generateProduct()
    product.id = id
    return product
}