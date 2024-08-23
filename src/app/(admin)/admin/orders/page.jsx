"use client"
import React, { useEffect, useState } from 'react'
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { MoreHorizontal, Eye, Truck, ChevronRight, ChevronLeft } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { useGetAdminOrdersQuery, useSearchOrdersQuery, useUpdateOrderStatusMutation } from '@/lib/features/api'


export default function Component() {
    const [selectedOrder, setSelectedOrder] = useState(null)
    const [isDetailsOpen, setIsDetailsOpen] = useState(false)
    const [isStatusUpdateOpen, setIsStatusUpdateOpen] = useState(false)
    const [search, setSearch] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const limit = 10; // Define the limit per page
    const [searchData, setSearchData] = useState([]);

    // Fetch orders
    const { data: ordersData, isFetching: ordersFetching } = useGetAdminOrdersQuery({ page: currentPage, limit });

    // Fetch search results
    const { data: searchResults, isFetching: searchFetching } = useSearchOrdersQuery({ q: search, page: currentPage, limit });

    // Update order status
    const [updateOrderStatus, { isLoading: orderStatusLoading }] = useUpdateOrderStatusMutation();

    useEffect(() => {
        if (search && searchResults) {
            setSearchData(searchResults.data);
        } else if (!search && ordersData) {
            setSearchData(ordersData.data);
        }
    }, [search, searchResults, ordersData]);
    const handleStatusUpdate = async (orderId, newStatus) => {
        try {
            await updateOrderStatus({ orderId, status: newStatus }).unwrap()
            setIsStatusUpdateOpen(false)
        } catch (error) {
            console.error("Failed to update order status:", error)
        }
    }

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        })
    }

    const calculateTotal = (items) => {
        return items.reduce((total, item) => total + item.quantity * item.productId.sellingPrice, 0)
    }

    const totalPages = searchResults?.totalPages || 1;

    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
    }

    if (ordersFetching || searchFetching || orderStatusLoading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="container mx-auto py-10">
            <div className="flex justify-between ">
                <h1 className="text-2xl font-bold mb-5">Order Management</h1>
                <Input placeholder="Search products..." value={search} onChange={e => setSearch(e.target.value)} className="max-w-sm" />
            </div>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Order ID</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Customer</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Total</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {searchData.map((order) => (
                        <TableRow key={order._id}>
                            <TableCell className="font-medium">{order._id.slice(-6)}</TableCell>
                            <TableCell>{formatDate(order.createdAt)}</TableCell>
                            <TableCell>{order.shippingAddress.name}</TableCell>
                            <TableCell>
                                <span className="capitalize px-2 py-1 rounded-full text-xs font-semibold bg-muted">
                                    {order.status}
                                </span>
                            </TableCell>
                            <TableCell>${calculateTotal(order.items).toFixed(2)}</TableCell>
                            <TableCell className="text-right">
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button variant="ghost" className="h-8 w-8 p-0">
                                            <span className="sr-only">Open menu</span>
                                            <MoreHorizontal className="h-4 w-4" />
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end">
                                        <DropdownMenuItem onSelect={() => {
                                            setSelectedOrder(order)
                                            setIsDetailsOpen(true)
                                        }}>
                                            <Eye className="mr-2 h-4 w-4" />
                                            View details
                                        </DropdownMenuItem>
                                        <DropdownMenuItem onSelect={() => {
                                            setSelectedOrder(order)
                                            setIsStatusUpdateOpen(true)
                                        }}>
                                            <Truck className="mr-2 h-4 w-4" />
                                            Update status
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>

            <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Order Details</DialogTitle>
                    </DialogHeader>
                    {selectedOrder && (
                        <div className="grid gap-4 py-4">
                            <div>
                                <h3 className="font-semibold">Customer Information</h3>
                                <p>{selectedOrder.shippingAddress.name}</p>
                                <p>{selectedOrder.shippingAddress.email}</p>
                                <p>{selectedOrder.shippingAddress.address}</p>
                                <p>{selectedOrder.shippingAddress.city}, {selectedOrder.shippingAddress.zipCode}</p>
                            </div>
                            <div>
                                <h3 className="font-semibold">Order Items</h3>
                                <ul>
                                    {selectedOrder.items.map((item, index) => (
                                        <li key={index} className="flex items-center space-x-2 mb-2">
                                            <img src={item.productId.productImage[0]} alt={item.productId.productName} className="w-10 h-10 object-cover rounded" />
                                            <span>{item.productId.productName} - Qty: {item.quantity} - ${item.productId.sellingPrice.toFixed(2)}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div>
                                <h3 className="font-semibold">Total: ${calculateTotal(selectedOrder.items).toFixed(2)}</h3>
                            </div>
                        </div>
                    )}
                </DialogContent>
            </Dialog>

            <Dialog open={isStatusUpdateOpen} onOpenChange={setIsStatusUpdateOpen}>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Update Order Status</DialogTitle>
                    </DialogHeader>
                    {selectedOrder && (
                        <div className="grid gap-4 py-4">
                            <Select onValueChange={(value) => handleStatusUpdate(selectedOrder._id, value)}>
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Select new status" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="processing">Processing</SelectItem>
                                    <SelectItem value="shipped">Shipped</SelectItem>
                                    <SelectItem value="delivered">Delivered</SelectItem>
                                    <SelectItem value="cancelled">Cancelled</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    )}
                </DialogContent>
            </Dialog>
            {totalPages > 1 && (
                <div className="flex justify-center items-center space-x-2 mt-8">

                    {totalPages > 1 && (
                        <div className="flex justify-center items-center space-x-2 mt-8">
                            <Button
                                variant="outline"
                                size="icon"
                                onClick={() => paginate(Math.max(1, currentPage - 1))}
                                disabled={currentPage === 1}
                            >
                                <ChevronLeft className="h-4 w-4" />
                            </Button>
                            {generatePaginationButtons(currentPage, totalPages, paginate, Button)}
                            <Button
                                variant="outline"
                                size="icon"
                                onClick={() => paginate(Math.min(totalPages, currentPage + 1))}
                                disabled={currentPage === totalPages}
                            >
                                <ChevronRight className="h-4 w-4" />
                            </Button>
                        </div>
                    )}
                </div>
            )}
        </div>
    )
}