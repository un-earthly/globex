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

const customers = [
    { id: '1', name: 'John Doe', email: 'john@example.com', orders: 5, totalSpent: 499.95 },
    { id: '2', name: 'Jane Smith', email: 'jane@example.com', orders: 3, totalSpent: 299.97 },
    { id: '3', name: 'Bob Johnson', email: 'bob@example.com', orders: 7, totalSpent: 799.93 },
    // Add more customers as needed
]

export default function Customers() {
    const [sortColumn, setSortColumn] = useState('')
    const [sortDirection, setSortDirection] = useState('asc')

    const sortedCustomers = [...customers].sort((a, b) => {
        if (sortColumn === 'orders') {
            return sortDirection === 'asc' ? a.orders - b.orders : b.orders - a.orders
        }
        if (sortColumn === 'totalSpent') {
            return sortDirection === 'asc' ? a.totalSpent - b.totalSpent : b.totalSpent - a.totalSpent
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
                <h2 className="text-3xl font-bold tracking-tight">Customers</h2>
                <div className="flex items-center space-x-2">
                    <Input placeholder="Search customers..." className="max-w-sm" />
                    <Button>Search</Button>
                </div>
            </div>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Customer ID</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead onClick={() => handleSort('orders')} className="cursor-pointer">
                            Orders <ArrowUpDown className="ml-2 h-4 w-4" />
                        </TableHead>
                        <TableHead onClick={() => handleSort('totalSpent')} className="cursor-pointer">
                            Total Spent <ArrowUpDown className="ml-2 h-4 w-4" />
                        </TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {sortedCustomers.map((customer) => (
                        <TableRow key={customer.id}>
                            <TableCell className="font-medium">{customer.id}</TableCell>
                            <TableCell>{customer.name}</TableCell>
                            <TableCell>{customer.email}</TableCell>
                            <TableCell>{customer.orders}</TableCell>
                            <TableCell>${customer.totalSpent.toFixed(2)}</TableCell>
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
                                        <DropdownMenuItem>Edit customer</DropdownMenuItem>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuItem>Delete customer</DropdownMenuItem>
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