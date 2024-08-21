"use client"
import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { MoreHorizontal, ArrowUpDown } from "lucide-react"

const orders = [
    { id: '1', customer: 'John Doe', date: '2023-06-01', status: 'Completed', total: 125.99 },
    { id: '2', customer: 'Jane Smith', date: '2023-06-02', status: 'Processing', total: 89.99 },
    { id: '3', customer: 'Bob Johnson', date: '2023-06-03', status: 'Shipped', total: 199.99 },
    // Add more orders as needed
]

export default function Orders() {
    const [sortColumn, setSortColumn] = useState('')
    const [sortDirection, setSortDirection] = useState('asc')

    const sortedOrders = [...orders].sort((a, b) => {
        if (sortColumn === 'date') {
            return sortDirection === 'asc'
                ? new Date(a.date).getTime() - new Date(b.date).getTime()
                : new Date(b.date).getTime() - new Date(a.date).getTime()
        }
        if (sortColumn === 'total') {
            return sortDirection === 'asc' ? a.total - b.total : b.total - a.total
        }
        return 0
    })

    const handleSort = (column) => {
        if (column === sortColumn) {
            setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')
        } else {
            setSortColumn(column)
            setSortDirection('asc')
        }
    }

    return (
        <div className="space-y-4">
            <div className="flex justify-between">
                <h2 className="text-3xl font-bold tracking-tight">Orders</h2>
                <div className="flex items-center space-x-2">
                    <Input placeholder="Search orders..." className="max-w-sm" />
                    <Button>Search</Button>
                </div>
            </div>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Order ID</TableHead>
                        <TableHead>Customer</TableHead>
                        <TableHead onClick={() => handleSort('date')} className="cursor-pointer">
                            Date <ArrowUpDown className="ml-2 h-4 w-4" />
                        </TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead onClick={() => handleSort('total')} className="cursor-pointer">
                            Total <ArrowUpDown className="ml-2 h-4 w-4" />
                        </TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {sortedOrders.map((order) => (
                        <TableRow key={order.id}>
                            <TableCell className="font-medium">{order.id}</TableCell>
                            <TableCell>{order.customer}</TableCell>
                            <TableCell>{order.date}</TableCell>
                            <TableCell>{order.status}</TableCell>
                            <TableCell>${order.total.toFixed(2)}</TableCell>
                            <TableCell className="text-right">
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button variant="ghost" className="h-8 w-8 p-0">
                                            <span className="sr-only">Open menu</span>
                                            <MoreHorizontal className="h-4 w-4" />
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end">
                                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                        <DropdownMenuItem>View details</DropdownMenuItem>
                                        <DropdownMenuItem>Update status</DropdownMenuItem>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuItem>Cancel order</DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    )
}