"use client"
import { useEffect, useState } from 'react'
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
import { MoreHorizontal, ChevronLeft, ChevronRight, EyeIcon, PencilIcon, TrashIcon } from "lucide-react"
import { CreateProductModal } from '@/components/CreateProductModal'
import { useDeleteProductMutation, useGetAllProductsQuery, useGetSearchResultQuery, useGetTopCategoriesQuery } from '@/lib/features/api'
import { Card, CardContent } from '@/components/ui/card'
import ProductModal from '@/components/ProductModal'
import DeleteModal from '@/components/DeleteModal'
import { generatePaginationButtons } from '@/lib/utils'
import ProductListSkeleton from '@/components/ProductListSkeleton'
import ErrCard from '@/components/ErrCard'


export default function Products() {
    const [currentPage, setCurrentPage] = useState(1);
    const limit = 100;

    const {
        data: categories,
        isError: categoriesErr,
        isLoading: categoriesLoading
    } = useGetTopCategoriesQuery();
    useEffect(() => {
        categories?.data?.map(c => console.log(c.name))
    }, [categories])
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [search, setSearch] = useState('')
    const [isEditing, setIsEditing] = useState(false)
    const [editedProduct, setEditedProduct] = useState(null)
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
    const [productToDelete, setProductToDelete] = useState(null)

    const [searchData, setSearchData] = useState([]);
    const {
        data,
        isLoading,
        isError,
        error
    } = useGetAllProductsQuery({ page: currentPage, limit });
    const [deleteProduct, { isLoading: isDeleting }] = useDeleteProductMutation();

    const { data: searchResults, isFetching } = useGetSearchResultQuery({ q: search, page: currentPage, limit });

    useEffect(() => {
        if (search) {
            if (!isFetching && searchResults) {
                setSearchData(searchResults.data);
            }
        } else {
            if (!isLoading && data) {
                setSearchData(data.data);
            }
        }


        console.log(searchResults)
    }, [search, isFetching, searchResults, isLoading, data]);
    const openModal = (product, editing = false) => {
        setEditedProduct({ ...product })
        setIsEditing(editing)
        setIsModalOpen(true)
    }
    const openDeleteDialog = (product) => {
        setProductToDelete(product)
        setIsDeleteDialogOpen(true)
    }

    const handleDelete = async () => {
        try {
            await deleteProduct(productToDelete._id).unwrap();
            console.log('Product deleted successfully');
        } catch (error) {
            console.error('Failed to delete product:', error);
        }
    };
    const handleImageUpload = (e) => {
    }
    if (isLoading) {
        return <ProductListSkeleton />;
    }

    if (isError) {
        <ErrCard />
    }
    const handleInputChange = (e) => {
        const { name, value } = e.target
        setEditedProduct(prev => ({ ...prev, [name]: value }))
    }

    const paginate = (pageNumber) => setCurrentPage(pageNumber);
    const handleSave = () => {

    };
    const totalPages = search ? searchResults?.totalPages : data?.totalPages;

    return (
        <div className="space-y-4">
            <div className="flex justify-between">
                <h2 className="text-3xl font-bold tracking-tight">Products</h2>
                <div className="flex items-center space-x-2">
                    <Input placeholder="Search products..." value={search} onChange={e => setSearch(e.target.value)} className="max-w-sm" />
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
                    {searchData?.map((product) => (
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
                                        <DropdownMenuItem onClick={() => openModal(product, false)}>
                                            <EyeIcon className="mr-2 h-4 w-4" />
                                            View
                                        </DropdownMenuItem>
                                        <DropdownMenuItem onClick={() => openModal(product, true)}>
                                            <PencilIcon className="mr-2 h-4 w-4" />
                                            Edit
                                        </DropdownMenuItem>

                                        <DropdownMenuSeparator />
                                        <DropdownMenuItem onClick={() => openDeleteDialog(product)}>
                                            <TrashIcon className="mr-2 h-4 w-4" />
                                            Delete
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>

            </Table>
            <ProductModal
                editedProduct={editedProduct}
                handleImageUpload={handleImageUpload}
                handleInputChange={handleInputChange}
                handleSave={handleSave}
                isEditing={isEditing}
                isModalOpen={isModalOpen}
                setIsModalOpen={setIsModalOpen}
            />
            <DeleteModal
                handleDelete={handleDelete}
                isDeleteDialogOpen={isDeleteDialogOpen}
                productToDelete={productToDelete}
                setIsDeleteDialogOpen={setIsDeleteDialogOpen}
            />
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