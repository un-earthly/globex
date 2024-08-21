'use client'

import { useSelector } from 'react-redux'
import { Button } from '@/components/ui/button'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle
} from '@/components/ui/card'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Package, Truck, CreditCard } from 'lucide-react'

export default function AccountPage() {
    const router = useRouter()
    const [orders, setOrders] = useState([])

    useEffect(() => {
        fetchOrders()
    }, [
        router])

    const fetchOrders = async () => {
        const mockOrders = [
            {
                id: '1',
                date: '2024-08-13',
                total: 99.99,
                status: 'Shipped',
                items: [
                    { name: 'Product A', quantity: 2, price: 29.99 },
                    { name: 'Product B', quantity: 1, price: 40.01 },
                ],
                shippingAddress: '123 Main St, City, Country',
                paymentMethod: 'Credit Card',
            },
            {
                id: '2',
                date: '2024-08-12',
                total: 149.99,
                status: 'Processing',
                items: [
                    { name: 'Product C', quantity: 1, price: 149.99 },
                ],
                shippingAddress: '456 Elm St, Town, Country',
                paymentMethod: 'PayPal',
            },
        ]
        setOrders(mockOrders)
    }

    return (
        <div className="container mx-auto max-w-4xl mt-10">
            <h1 className="text-3xl font-bold mb-6">My Account</h1>
            <Card className="mb-8">
                <CardHeader>
                    <CardTitle>Test User</CardTitle>
                    <CardDescription>Test Email</CardDescription>
                </CardHeader>
                <CardContent>
                    <p>Account ID: 012312</p>
                    <p>Address : 123 Main St, City, Country</p>
                </CardContent>
                <CardFooter>
                    <Button>Edit Profile</Button>
                </CardFooter>
            </Card>

            <Card>
                <CardHeader>    
                    <CardTitle>My Orders</CardTitle>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Order ID</TableHead>
                                <TableHead>Date</TableHead>
                                <TableHead>Total</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Action</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {orders.map((order) => (
                                <TableRow key={order.id}>
                                    <TableCell>{order.id}</TableCell>
                                    <TableCell>{order.date}</TableCell>
                                    <TableCell>${order.total.toFixed(2)}</TableCell>
                                    <TableCell>{order.status}</TableCell>
                                    <TableCell>
                                        <Dialog>
                                            <DialogTrigger asChild>
                                                <Button variant="outline">
                                                    View Details
                                                </Button>
                                            </DialogTrigger>
                                            <DialogContent className="max-w-3xl">
                                                <DialogHeader>
                                                    <DialogTitle>Order Details - #{order.id}</DialogTitle>
                                                </DialogHeader>
                                                <OrderDetails order={order} />
                                            </DialogContent>
                                        </Dialog>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    )
}

function OrderDetails({ order }) {
    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <OrderDetailItem
                    icon={<Package className="w-6 h-6 text-blue-500" />}
                    title="Order Information"
                    details={[
                        { label: "Order ID", value: order.id },
                        { label: "Date", value: order.date },
                        { label: "Total", value: `$${order.total.toFixed(2)}` },
                        { label: "Status", value: order.status },
                    ]}
                />
                <OrderDetailItem
                    icon={<Truck className="w-6 h-6 text-blue-500" />}
                    title="Shipping Address"
                    details={[
                        { label: "Address", value: order.shippingAddress },
                    ]}
                />
                <OrderDetailItem
                    icon={<CreditCard className="w-6 h-6 text-blue-500" />}
                    title="Payment Method"
                    details={[
                        { label: "Method", value: order.paymentMethod },
                    ]}
                />
            </div>
            <div>
                <h3 className="font-semibold text-lg mb-2">Order Items</h3>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Product</TableHead>
                            <TableHead>Quantity</TableHead>
                            <TableHead>Price</TableHead>
                            <TableHead>Subtotal</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {order.items.map((item, index) => (
                            <TableRow key={index}>
                                <TableCell>{item.name}</TableCell>
                                <TableCell>{item.quantity}</TableCell>
                                <TableCell>${item.price.toFixed(2)}</TableCell>
                                <TableCell>${(item.quantity * item.price).toFixed(2)}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}

function OrderDetailItem({ icon, title, details }) {
    return (
        <div className="space-y-2">
            <div className="flex items-center space-x-2">
                {icon}
                <h4 className="font-semibold text-lg">{title}</h4>
            </div>
            <dl className="space-y-1">
                {details.map((detail, index) => (
                    <div key={index} className="flex justify-between">
                        <dt className="text-sm text-gray-500">{detail.label}:</dt>
                        <dd className="text-sm font-medium">{detail.value}</dd>
                    </div>
                ))}
            </dl>
        </div>
    );
}