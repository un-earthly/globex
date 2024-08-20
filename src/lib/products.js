import { faker } from '@faker-js/faker';
import { generateProduct } from './faker'

export async function fetchFeaturedProducts() {
    await new Promise(resolve => setTimeout(resolve, 1000))
    return Array(8).fill().map(() => generateProduct())
}
// Fetch deal of the day
export async function fetchDealOfTheDay() {
    await new Promise(resolve => setTimeout(resolve, 1000));
    return generateProduct();
}


// Fetch top categories
// export async function fetchTopCategories() {
//     // Simulate API call
//     await new Promise(resolve => setTimeout(resolve, 1000));
//     return [
//         { id: 1, name: 'Electronics', imageUrl: faker.image.url(300, 300, 'electronics', true), },
//         { id: 2, name: 'Clothing', imageUrl: faker.image.url(300, 300, 'clothing', true), },
//         { id: 3, name: 'Home & Garden', imageUrl: faker.image.url(300, 300, 'garden', true), },
//         { id: 4, name: 'Sports', imageUrl: faker.image.url(300, 300, 'sports', true), },
//         { id: 5, name: 'Toys', imageUrl: faker.image.url(300, 300, 'toys', true), },
//         { id: 6, name: 'Books', imageUrl: faker.image.url(300, 300, 'books', true), },
//     ];
// }
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