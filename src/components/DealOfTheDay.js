"use client"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import AddToCartButton from './AddToCartButton'
import { Clock } from 'lucide-react'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "./ui/carousel";
import { useEffect, useState } from 'react';

export default function DealOfTheDay({ deal }) {
    const [timeLeft, setTimeLeft] = useState(86400);
    useEffect(() => {
        const interval = setInterval(() => {
            setTimeLeft(prevTime => (prevTime > 0 ? prevTime - 1 : 0));
        }, 1000);

        return () => clearInterval(interval); // Cleanup on component unmount
    }, []);
    const formatTime = (seconds) => {
        const hrs = Math.floor(seconds / 3600);
        const mins = Math.floor((seconds % 3600) / 60);
        const secs = seconds % 60;
        return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };
    return (
        <>
            {deal ?
                <Card className="flex flex-col md:flex-row overflow-hidden">
                    <div className="w-full md:w-1/2 relative">
                        <Carousel className="w-full">
                            <CarouselContent>
                                {deal.productImage.map((image, index) => (
                                    <CarouselItem key={index}>
                                        <div className="h-96">
                                            <img
                                                src={image}
                                                alt={`${deal.productName} - Image ${index + 1}`}
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                    </CarouselItem>
                                ))}
                            </CarouselContent>
                        </Carousel>
                        <Badge className="absolute top-4 left-4 bg-red-600">Deal of the Day</Badge>
                    </div>
                    <CardContent className="p-6 flex-1 flex flex-col justify-between">
                        <div>
                            <CardHeader className="px-0">
                                <CardTitle className="text-2xl font-semibold">{deal.productName}</CardTitle>
                                <CardDescription className="text-gray-700">{deal.description}</CardDescription>
                            </CardHeader>
                            <div className="mt-4 flex items-center space-x-2">
                                <span className="text-3xl font-bold text-red-600">${deal.sellingPrice}</span>
                                {deal.price && (
                                    <span className="text-lg text-gray-500 line-through">${deal.price}</span>
                                )}
                            </div>
                        </div>
                        <div className="mt-6">
                            <div className="flex items-center text-gray-600 mb-4">
                                <Clock className="mr-2" size={20} />
                                <span>Offer ends in: {formatTime(timeLeft)}</span>
                            </div>
                            <AddToCartButton product={deal} />
                        </div>
                    </CardContent>
                </Card>
                : <p>Not Found</p>}
        </>
    );
}