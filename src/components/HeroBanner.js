import { faker } from '@faker-js/faker';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { AspectRatio } from '@/components/ui/aspect-ratio';

export default function HeroBanner() {
    return (
        <Card className="relative overflow-hidden">
            <AspectRatio ratio={16 / 9}>
                <img
                    src={faker.image.url(1200, 675, 'product', true)}
                    alt="Hero Banner"
                    className="object-cover w-full h-full"
                />
                <div className="absolute inset-0 bg-blue-600 bg-opacity-60" />
                <CardContent className="absolute inset-0 flex flex-col justify-center items-center text-white p-8">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4 text-center">Welcome to Our Store!</h1>
                    <p className="text-lg md:text-xl mb-6 text-center max-w-2xl">Discover the best products at unbeatable prices.</p>
                    <Button asChild size="lg" variant="secondary">
                        <Link href="/products">
                            Shop Now
                        </Link>
                    </Button>
                </CardContent>
            </AspectRatio>
        </Card>
    );
}