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
import { MoreHorizontal, ArrowUpDown, ChevronLeft, ChevronRight } from "lucide-react"
import { CreateProductModal } from '@/components/CreateProductModal'
import { useGetAllProductsQuery } from '@/lib/features/api'
import { Card, CardContent } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'


export default function Products() {
    const [sortColumn, setSortColumn] = useState('')
    const [sortDirection, setSortDirection] = useState('asc')
    const [currentPage, setCurrentPage] = useState(1);
    const limit = 20; // This matches the default limit in your API
    const {
        data,
        isLoading,
        isError,
        error
    } = useGetAllProductsQuery({ page: currentPage, limit });

    if (isLoading) {
        return <ProductListSkeleton />;
    }

    if (isError) {
        return (
            <Card>
                <CardContent className="p-6 text-center text-red-500">
                    <p className="text-lg font-semibold">Error loading products</p>
                    <p className="mt-2">{error.message || 'An unexpected error occurred'}</p>
                </CardContent>
            </Card>
        );
    }
    const { data: products, totalPages } = data;

    const paginate = (pageNumber) => setCurrentPage(pageNumber);
    const generatePaginationButtons = () => {
        const buttons = [];
        const maxVisibleButtons = 5;

        if (totalPages <= maxVisibleButtons) {
            for (let i = 1; i <= totalPages; i++) {
                buttons.push(
                    <Button
                        key={i}
                        variant={currentPage === i ? "default" : "outline"}
                        size="sm"
                        onClick={() => paginate(i)}
                    >
                        {i}
                    </Button>
                );
            }
        } else {
            buttons.push(
                <Button
                    key={1}
                    variant={currentPage === 1 ? "default" : "outline"}
                    size="sm"
                    onClick={() => paginate(1)}
                >
                    1
                </Button>
            );

            if (currentPage > 3) {
                buttons.push(<span key="ellipsis1">...</span>);
            }

            for (let i = Math.max(2, currentPage - 1); i <= Math.min(currentPage + 1, totalPages - 1); i++) {
                buttons.push(
                    <Button
                        key={i}
                        variant={currentPage === i ? "default" : "outline"}
                        size="sm"
                        onClick={() => paginate(i)}
                    >
                        {i}
                    </Button>
                );
            }

            if (currentPage < totalPages - 2) {
                buttons.push(<span key="ellipsis2">...</span>);
            }

            buttons.push(
                <Button
                    key={totalPages}
                    variant={currentPage === totalPages ? "default" : "outline"}
                    size="sm"
                    onClick={() => paginate(totalPages)}
                >
                    {totalPages}
                </Button>
            );
        }

        return buttons;
    };
    return (
        <div className="space-y-4">
            <div className="flex justify-between">
                <h2 className="text-3xl font-bold tracking-tight">Products</h2>
                <div className="flex items-center space-x-2">
                    <Input placeholder="Search products..." className="max-w-sm" />
                    <Button>Search</Button>
                    <CreateProductModal>
                        <Button>Add Product</Button>
                    </CreateProductModal>
                </div>
            </div>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Image</TableHead>
                        <TableHead> ID</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Category</TableHead>
                        <TableHead className="cursor-pointer">
                            Price 
                        </TableHead>
                        <TableHead className="cursor-pointer">
                            Stock 
                        </TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {data?.data?.map((product) => (
                        <TableRow key={product.id}>
                            <TableCell className="font-medium"><img className='h-6 w-6' src={product.productImage[0]} alt="" /></TableCell>
                            <TableCell className="font-medium">{product._id}</TableCell>
                            <TableCell>{product.productName}</TableCell>
                            <TableCell>{product.category}</TableCell>
                            <TableCell>${product.price.toFixed(2)}</TableCell>
                            <TableCell>{product.stock}</TableCell>
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
                                        <DropdownMenuItem>Edit product</DropdownMenuItem>
                                        <DropdownMenuItem>View details</DropdownMenuItem>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuItem>Delete product</DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
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
                            {generatePaginationButtons()}
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

function ProductListSkeleton() {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[...Array(8)].map((_, index) => (
                <Card key={index}>
                    <Skeleton className="h-64 w-full" />
                    <CardContent className="p-4">
                        <Skeleton className="h-4 w-2/3 mb-2" />
                        <Skeleton className="h-4 w-1/2" />
                    </CardContent>
                </Card>
            ))}
        </div>
    );
}