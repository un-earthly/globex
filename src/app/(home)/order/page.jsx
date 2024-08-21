"use client"
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Container } from '@/components/ui/container';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useGetOrdersQuery } from '@/lib/features/orderApi';
import { TruckIcon } from 'lucide-react';
import Link from 'next/link';

const OrdersPage = () => {
    const { data: ordersData, isLoading, isError } = useGetOrdersQuery();

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (isError) {
        return <div>Error fetching orders.</div>;
    }

    const orders = ordersData.data;
    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    }
    return (
        <Container>
            <h1 className="text-2xl font-bold mb-6">My Orders</h1>
            {orders.map((order) => (
                <Card key={order._id}>
                    <CardHeader>
                        <CardTitle className="flex justify-between items-center">
                            <span>Order {order._id}</span>
                            <Badge variant="secondary">
                                {order.paymentMethod === 'credit_card' ? 'Paid' : 'Payment Pending'}
                            </Badge>
                        </CardTitle>
                        <CardDescription>Placed on {formatDate(order.createdAt)}</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="mb-4">
                            <h3 className="font-semibold mb-2">Shipping Address</h3>
                            <p>{order.shippingAddress.name}</p>
                            <p>{order.shippingAddress.address}</p>
                            <p>{order.shippingAddress.city}, {order.shippingAddress.zipCode}</p>
                            <p>{order.shippingAddress.email}</p>
                        </div>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Product</TableHead>
                                    <TableHead>Brand</TableHead>
                                    <TableHead className="text-right">Quantity</TableHead>
                                    <TableHead className="text-right">Price</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {order.items.map((item) => (
                                    <TableRow key={item._id}>
                                        <TableCell>{item.productId.productName}</TableCell>
                                        <TableCell>{item.productId.brandName}</TableCell>
                                        <TableCell className="text-right">{item.quantity}</TableCell>
                                        <TableCell className="text-right">${item.productId.sellingPrice.toFixed(2)}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                    <CardFooter className="flex justify-between items-center">
                        <div className="flex items-center space-x-2">
                            <TruckIcon className="h-5 w-5 text-yellow-500" />
                            <span className="text-sm text-muted-foreground capitalize">
                                {order.status}
                            </span>
                        </div>
                        <div className="space-x-2">
                            <span className="font-semibold">
                                Total: ${order.items.reduce((total, item) => total + (item.productId.sellingPrice * item.quantity), 0).toFixed(2)}
                            </span>
                            <Link href={`/order/${order._id}`}>
                                <Button variant="outline" size="sm">
                                    View Details
                                </Button>
                            </Link>
                        </div>
                    </CardFooter>
                </Card>
            ))}
        </Container>
    );
};

export default OrdersPage;