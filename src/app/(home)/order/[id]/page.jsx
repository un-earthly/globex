"use client"
import { useState } from 'react'
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { ArrowLeft, CreditCard, Truck } from "lucide-react"
import Link from 'next/link'
import { useGetOrderQuery } from '@/lib/features/orderApi'

const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
}

// Helper function to capitalize first letter
const capitalize = (s) => s.charAt(0).toUpperCase() + s.slice(1);

export default function OrderDetails({ params }) {
    const { data, isError, isLoading } = useGetOrderQuery(params.id);
    const order = data?.data;

    const [selectedImages, setSelectedImages] = useState({});

    if (isLoading) return <div>Loading...</div>;
    if (isError) return <div>Error loading order details</div>;

    if (!order) return <div>No order found</div>;

    const subtotal = order.items.reduce((total, item) => total + (item.productId.sellingPrice * item.quantity), 0);
    const shipping = 0;
    const total = subtotal + shipping;

    return (
        <div className="container mx-auto px-4 py-8">
            <Link href={"/order"}>
                <Button variant="ghost" className="mb-4" onClick={() => console.log('Go back')}>
                    <ArrowLeft className="mr-2 h-4 w-4" /> Back to Orders
                </Button>
            </Link>
            <Card>
                <CardHeader>
                    <CardTitle className="flex justify-between items-center">
                        <span>Order Details: {order._id}</span>
                        <Badge variant="secondary">
                            {order.paymentMethod === 'credit_card' ? 'Paid' : 'Payment Pending'}
                        </Badge>
                    </CardTitle>
                    <CardDescription>Placed on {formatDate(order.createdAt)}</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="grid md:grid-cols-2 gap-6">
                        <div>
                            <h3 className="font-semibold mb-2">Shipping Address</h3>
                            <p>{order.shippingAddress.name}</p>
                            <p>{order.shippingAddress.address}</p>
                            <p>{order.shippingAddress.city}, {order.shippingAddress.zipCode}</p>
                            <p>{order.shippingAddress.email}</p>
                        </div>
                        <div>
                            <h3 className="font-semibold mb-2">Order Summary</h3>
                            <p className='capitalize'>Order Status: <Badge>{order.status}</Badge></p>
                            <p>Payment Method: {capitalize(order.paymentMethod.replace('_', ' '))}</p>
                            <div className="flex items-center mt-2">
                                {order.paymentMethod === 'credit_card' ? (
                                    <CreditCard className="mr-2 h-4 w-4 text-green-500" />
                                ) : (
                                    <Truck className="mr-2 h-4 w-4 text-yellow-500" />
                                )}
                                <span className="text-sm text-muted-foreground">
                                    {order.paymentMethod === 'credit_card' ? 'Payment Received' : 'Payment Pending'}
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className="mt-6">
                        <h3 className="font-semibold mb-2">Order Items</h3>
                        {order.items.map((item, index) => (
                            <Card key={item._id} className="mb-4">
                                <CardContent className="p-4">
                                    <div className="flex flex-col md:flex-row gap-4">
                                        <div className="w-full md:w-1/3">
                                            <img
                                                src={item.productId.productImage[selectedImages[item._id] || 0]}
                                                alt={item.productId.productName}
                                                className="w-full h-48 object-cover rounded-md"
                                            />
                                            {item.productId.productImage.length > 1 && (
                                                <div className="flex mt-2 gap-2">
                                                    {item.productId.productImage.map((img, imgIndex) => (
                                                        <button
                                                            key={imgIndex}
                                                            onClick={() => setSelectedImages({ ...selectedImages, [item._id]: imgIndex })}
                                                            className={`w-8 h-8 rounded-full ${selectedImages[item._id] === imgIndex ? 'ring-2 ring-primary' : ''}`}
                                                        >
                                                            <img src={img} alt={`${item.productId.productName} thumbnail ${imgIndex + 1}`} className="w-full h-full object-cover rounded-full" />
                                                        </button>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                        <div className="w-full md:w-2/3">
                                            <h4 className="font-semibold">{item.productId.productName}</h4>
                                            <p className="text-sm text-muted-foreground">{item.productId.brandName}</p>
                                            <p className="mt-2">{item.productId.description}</p>
                                            <div className="mt-4 flex justify-between items-center">
                                                <span>Quantity: {item.quantity}</span>
                                                <span className="font-semibold">${item.productId.sellingPrice.toFixed(2)}</span>
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </CardContent>
                <CardFooter>
                    <div className="w-full">
                        <Table>
                            <TableBody>
                                <TableRow>
                                    <TableCell>Subtotal</TableCell>
                                    <TableCell className="text-right">${subtotal.toFixed(2)}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>Shipping</TableCell>
                                    <TableCell className="text-right">${shipping.toFixed(2)}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell className="font-semibold">Total</TableCell>
                                    <TableCell className="text-right font-semibold">${total.toFixed(2)}</TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </div>
                </CardFooter>
            </Card>
        </div>
    )
}