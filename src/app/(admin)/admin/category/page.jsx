"use client"
import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { PlusIcon, Pencil1Icon, TrashIcon } from '@radix-ui/react-icons'
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import {
    useGetTopCategoriesQuery,
    useAddCategoryMutation,
    useUpdateCategoryMutation,
    useDeleteCategoryMutation,
    useDeleteSubcategoryMutation,
    useAddSubcategoryMutation,
    useUpdateSubcategoryMutation
} from '@/lib/features/api'


const generateSlug = (name) => {
    return name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')
}

export default function Component() {
    const { isFetching, data, isError } = useGetTopCategoriesQuery()
    const [addCategory] = useAddCategoryMutation();
    const [addSubcategory] = useAddSubcategoryMutation();
    const [updateCategory] = useUpdateCategoryMutation()
    const [updateSubcategory] = useUpdateSubcategoryMutation()
    const [deleteCategory] = useDeleteCategoryMutation()
    const [deleteSubCategory] = useDeleteSubcategoryMutation()
    const [newCategory, setNewCategory] = useState({ name: '', image: '' })
    const [newSubcategory, setNewSubcategory] = useState({ name: '', image: '', categorySlug: '' })
    const [editingCategory, setEditingCategory] = useState(null)
    const [editingSubcategory, setEditingSubcategory] = useState(null)

    if (isFetching) {
        return <p>Loading...</p>
    }
    if (isError) {
        return <p>Error loading categories.</p>
    }
    const categories = data.categories || []

    const handleAddCategory = async () => {
        const slug = generateSlug(newCategory.name)
        try {
            await addCategory({ ...newCategory, slug }).unwrap()
            setNewCategory({ name: '', image: '' })
        } catch (error) {
            console.error("Failed to add category:", error)
        }
    }

    const handleAddSubcategory = async () => {
        const slug = generateSlug(newSubcategory.name)

        try {
            await addSubcategory({ ...newSubcategory, slug }).unwrap();
            console.log('Subcategory added successfully');
        } catch (error) {
            console.error('Failed to add subcategory:', error);
        }
    };

    const handleEditCategory = (category) => {
        setEditingCategory(category)
    }

    const handleEditSubcategory = (subcategory, categoryIndex) => {
        setEditingSubcategory({ ...subcategory, parentIndex: categoryIndex })
    }

    const handleUpdateCategory = async () => {
        try {
            await updateCategory(editingCategory).unwrap()
            setEditingCategory(null)
        } catch (error) {
            console.error("Failed to update category:", error)
        }
    }

    const handleUpdateSubcategory = async () => {
        const parentCategory = categories[editingSubcategory.parentIndex]
        const updatedSubcategories = parentCategory.subcategories.map(sub => sub.slug === editingSubcategory.slug ? editingSubcategory : sub)

        try {
            await updateSubcategory({ categoryId: parentCategory._id, subcategoryId: updatedSubcategories[0]._id, updatedSubcategory: updatedSubcategories[0] }).unwrap()
            setEditingSubcategory(null)
        } catch (error) {
            console.error("Failed to update subcategory:", error)
        }
    }

    const handleDeleteCategory = async (categoryIndex) => {
        const categoryToDelete = categories[categoryIndex]
        console.log("Deleting category:", categoryToDelete._id)
        try {
            await deleteCategory(categoryToDelete._id).unwrap()
        } catch (error) {
            console.error("Failed to delete category:", error)
        }
    }
    const handleDeleteSubcategory = async (categoryIndex, subcategoryIndex) => {
        if (!data || !data.categories) return;

        const category = data.categories[categoryIndex];
        const subcategoryId = category.subcategories[subcategoryIndex]._id;

        try {
            await deleteSubCategory({ categoryId: category._id, subcategoryId }).unwrap();
            // Optionally, you may want to refetch or update the UI after deletion
            console.log('Subcategory deleted successfully');
        } catch (error) {
            console.error('Failed to delete subcategory:', error);
        }
    };
    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Category Management</h1>

            <div className="grid md:grid-cols-2 gap-8 mb-8">
                <Card>
                    <CardHeader>
                        <CardTitle>Add New Category</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="grid w-full items-center gap-4">
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="name">Name</Label>
                                <Input id="name" placeholder="Category name" value={newCategory.name} onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })} />
                            </div>
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="image">Image URL</Label>
                                <Input id="image" placeholder="https://example.com/image.jpg" value={newCategory.image} onChange={(e) => setNewCategory({ ...newCategory, image: e.target.value })} />
                            </div>
                            <Button onClick={handleAddCategory}>Add Category</Button>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Add New Subcategory</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="grid w-full items-center gap-4">
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="subcategory-name">Name</Label>
                                <Input id="subcategory-name" placeholder="Subcategory name" value={newSubcategory.name} onChange={(e) => setNewSubcategory({ ...newSubcategory, name: e.target.value })} />
                            </div>
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="subcategory-image">Image URL</Label>
                                <Input id="subcategory-image" placeholder="https://example.com/image.jpg" value={newSubcategory.image} onChange={(e) => setNewSubcategory({ ...newSubcategory, image: e.target.value })} />
                            </div>
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="parent-category">Parent Category</Label>
                                <Select onValueChange={(value) => setNewSubcategory({ ...newSubcategory, categorySlug: value })}>
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Select a category" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {categories.map((category, index) => (
                                            <SelectItem key={index} value={category.slug}>{category.name}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                            <Button onClick={handleAddSubcategory} disabled={!newSubcategory.categorySlug}>Add Subcategory</Button>
                        </div>
                    </CardContent>
                </Card>
            </div>

            <div className="bg-white py-5 px-12 shadow-sm rounded-lg ">
                <Accordion type="single" collapsible className="w-full">
                    {categories.map((category, categoryIndex) => (
                        <AccordionItem value={`item-${categoryIndex}`} key={categoryIndex}>
                            <AccordionTrigger className="text-left">
                                <div className="flex justify-between items-center w-full">
                                    <span>{category.name}</span>
                                    <div className="flex gap-2 mr-3">
                                        <Button variant="outline" size="icon" onClick={(e) => { e.stopPropagation(); handleEditCategory(category, categoryIndex); }}>
                                            <Pencil1Icon className="h-4 w-4" />
                                        </Button>
                                        <Button variant="outline" size="icon" onClick={(e) => { e.stopPropagation(); handleDeleteCategory(categoryIndex); }}>
                                            <TrashIcon className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </div>
                            </AccordionTrigger>
                            <AccordionContent>
                                <div className="pl-4 space-y-2">
                                    {category.subcategories.map((subcategory, subcategoryIndex) => (
                                        <div key={subcategoryIndex} className="flex justify-between items-center">
                                            <span>{subcategory.name}</span>
                                            <div className="flex gap-2">
                                                <Button variant="outline" size="icon" onClick={() => handleEditSubcategory(subcategory, categoryIndex, subcategoryIndex)}>
                                                    <Pencil1Icon className="h-4 w-4" />
                                                </Button>
                                                <Button variant="outline" size="icon" onClick={() => handleDeleteSubcategory(categoryIndex, subcategoryIndex)}>
                                                    <TrashIcon className="h-4 w-4" />
                                                </Button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </AccordionContent>
                        </AccordionItem>
                    ))}
                </Accordion>
            </div>

            {editingCategory && (
                <Card className="mt-8">
                    <CardHeader>
                        <CardTitle>Edit Category</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="grid w-full items-center gap-4">
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="edit-name">Name</Label>
                                <Input id="edit-name" value={editingCategory.name} onChange={(e) => setEditingCategory({ ...editingCategory, name: e.target.value })} />
                            </div>
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="edit-image">Image URL</Label>
                                <Input id="edit-image" value={editingCategory.image} onChange={(e) => setEditingCategory({ ...editingCategory, image: e.target.value })} />
                            </div>
                            <Button onClick={handleUpdateCategory}>Update Category</Button>
                        </div>
                    </CardContent>
                </Card>
            )}

            {editingSubcategory && (
                <Card className="mt-8">
                    <CardHeader>
                        <CardTitle>Edit Subcategory</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="grid w-full items-center gap-4">
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="edit-subcategory-name">Name</Label>
                                <Input id="edit-subcategory-name" value={editingSubcategory.name} onChange={(e) => setEditingSubcategory({ ...editingSubcategory, name: e.target.value })} />
                            </div>
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="edit-subcategory-image">Image URL</Label>
                                <Input id="edit-subcategory-image" value={editingSubcategory.image} onChange={(e) => setEditingSubcategory({ ...editingSubcategory, image: e.target.value })} />
                            </div>
                            <Button onClick={handleUpdateSubcategory}>Update Subcategory</Button>
                        </div>
                    </CardContent>
                </Card>
            )}
        </div>
    )
}