import { faker } from '@faker-js/faker';

export const generateProduct = () => ({
    id: faker.string.uuid(),
    name: faker.commerce.productName(),
    price: parseFloat(faker.commerce.price()),
    description: faker.commerce.productDescription(),
    image: faker.image.url(300, 300, 'product', true),
    category: faker.commerce.department(),
    brand: faker.company.name(),
    rating: faker.number.int({ min: 1, max: 5, precision: 0.1 }),
    numReviews: faker.number.int({ min: 0, max: 500 }),
    countInStock: faker.number.int({ min: 0, max: 100 }),
});

export function generateCategory() {
    return {
        id: faker.string.uuid(),
        name: faker.commerce.department(),
        imageUrl: faker.image.url(300, 300, 'product', true),
    };
}
export const generateUser = () => ({
    id: faker.string.uuid(),
    name: faker.person.fullName(),
    email: faker.internet.email(),
    avatar: faker.image.avatar(),
    address: {
        street: faker.location.streetAddress(),
        city: faker.location.city(),
        state: faker.location.state(),
        zipCode: faker.location.zipCode(),
        country: faker.location.country(),
    },
});

export const generateReview = () => ({
    id: faker.string.uuid(),
    userId: faker.string.uuid(),
    userName: faker.person.fullName(),
    rating: faker.number.int({ min: 1, max: 5 }),
    comment: faker.lorem.paragraph(),
    createdAt: faker.date.past(),
});

export const generateOrder = () => ({
    id: faker.string.uuid(),
    userId: faker.string.uuid(),
    items: Array(faker.number.int({ min: 1, max: 5 })).fill().map(() => ({
        product: generateProduct(),
        quantity: faker.number.int({ min: 1, max: 10 }),
    })),
    totalAmount: faker.commerce.price({ min: 100, max: 1000, dec: 2 }),
    status: faker.helpers.arrayElement(['pending', 'processing', 'shipped', 'delivered']),
    createdAt: faker.date.past(),
    shippingAddress: {
        street: faker.location.streetAddress(),
        city: faker.location.city(),
        state: faker.location.state(),
        zipCode: faker.location.zipCode(),
        country: faker.location.country(),
    },
});




const categories = [
    '66c1aecb5667e83f8b5e574e', // electronics
    '66c1aecb5667e83f8b5e574f', // fashion
    '66c1aecb5667e83f8b5e5750', // home appliance
    '66c1aecb5667e83f8b5e5751', // beauty and health
    '66c1aecb5667e83f8b5e5752', // sports
    '66c1aecb5667e83f8b5e5753', // automotive
    '66c1aecb5667e83f8b5e5754', // toys and games
];

const subCategories = [
    "smartphones",
    "laptops",
    "tablets",
    "cameras",
    "headphones",
    "smartwatches",
    "gaming-consoles",
    "drones",
    "mens-clothing",
    "womens-clothing",
    "footwear",
    "watches",
    "bags",
    "jewelry",
    "sunglasses",
    "accessories",
    "refrigerators",
    "washing-machines",
    "microwave-ovens",
    "air-conditioners",
    "vacuum-cleaners",
    "water-purifiers",
    "kitchen-appliances",
    "heaters",
    "skincare",
    "makeup",
    "haircare",
    "fragrances",
    "personal-care",
    "health-supplements",
    "sportswear",
    "sports-footwear",
    "gym-equipment",
    "outdoor-gear",
    "team-sports",
    "cycling",
    "yoga",
    "swimming",
    "car-accessories",
    "motorbike-accessories",
    "tires-wheels",
    "oils-fluids",
    "car-care",
    "motorbike-parts",
    "tools-equipment",
    "action-figures",
    "board-games",
    "puzzles",
    "dolls",
    "educational-toys",
    "outdoor-toys",
    "video-games",
    "building-sets"
];

// (async function generateProducts() {
//     const products = [];
//     for (let i = 0; i < 1000; i++) {
//         const price = parseFloat(faker.commerce.price());
//         const sellingPrice = parseFloat(faker.commerce.price({ min: 0, max: price }));

//         const product = {
//             productName: faker.commerce.productName(),
//             brandName: faker.company.name(),
//             category: categories[Math.floor(Math.random() * categories.length)],
//             subcategory: subCategories[Math.floor(Math.random() * subCategories.length)],
//             productImage: [
//                 faker.image.url(300, 300, 'product', true),
//                 faker.image.url(300, 300, 'product', true),
//             ],
//             description: faker.commerce.productDescription(),
//             price: price.toFixed(2),
//             sellingPrice: sellingPrice.toFixed(2),
//         };
//         products.push(product);
//     }
//     const productsJson = JSON.stringify(products, null, 2);

//     console.log(productsJson);
// })();