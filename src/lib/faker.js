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
    totalAmount: faker.commerce.price({min:100,max: 1000, dec:2}),
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