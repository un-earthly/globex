import { faker } from '@faker-js/faker';
import { Button } from './ui/button';
import Link from 'next/link';

export default function HeroBanner() {
    return (
        <div className="relative bg-blue-600 text-white rounded-lg overflow-hidden shadow-lg">
            <img
                src={faker.image.url(300, 300, 'product', true)}
                alt="Hero Banner"
                layout="fill"
                objectFit="cover"
                quality={100}
                className="opacity-75"
            />
            <div className="absolute inset-0 flex flex-col justify-center items-center p-8">
                <h1 className="text-4xl md:text-5xl font-bold mb-4">Welcome to Our Store!</h1>
                <p className="text-lg md:text-xl mb-6">Discover the best products at unbeatable prices.</p>
                <Button asChild className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold shadow-md hover:bg-gray-100 transition duration-300">
                    <Link href={"/products"}>
                        Shop Now
                    </Link>
                </Button>
            </div>
        </div>
    );
}
