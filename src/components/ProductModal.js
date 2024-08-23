import React, { useCallback, useEffect, useState } from 'react'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { uploadImages } from '@/lib/utils'
import { useDropzone } from 'react-dropzone'
import { Carousel, CarouselContent, CarouselItem } from './ui/carousel'
import { useUpdateProductMutation } from '@/lib/features/api'
export default function ProductModal({
    setIsModalOpen,
    isModalOpen,
    isEditing,
    editedProduct,
    handleInputChange,
}) {
    const [updateProduct, { isLoading }] = useUpdateProductMutation();
    const onDrop = useCallback(async (acceptedFiles) => {
        const uploadedImages = await uploadImages(acceptedFiles);
        setImages((prevImages) => [...prevImages, ...uploadedImages]);
    }, []);
    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop, accept: 'image/*' });
    // if (!isModalOpen) {
    //     return null;
    // }
    const [images, setImages] = useState(editedProduct.productImage);

    useEffect(() => {
        if (editedProduct?.productImage) {
            setImages(editedProduct.productImage);
        }
    }, [editedProduct]);
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await updateProduct({ id: editedProduct._id, updatedData: editedProduct }).unwrap();
            console.log('Product updated successfully');
        } catch (error) {
            console.error('Failed to update product:', error);
        }
    };
    return (
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
            <DialogContent className="sm:max-w-[425px] overflow-y-auto h-[90vh]">
                <DialogHeader>
                    <DialogTitle>{isEditing ? 'Edit Product' : 'Product Details'}</DialogTitle>
                    <DialogDescription>
                        {isEditing ? 'Make changes to the product details below.' : 'View product information.'}
                    </DialogDescription>
                </DialogHeader>
                {editedProduct && (
                    <div className="space-y-4">
                        <Carousel className="col-span-4">
                            <CarouselContent>

                                {images.map((image, index) => (
                                    <CarouselItem key={index}>
                                        <img
                                            key={index}
                                            src={image}
                                            alt={`${editedProduct.productName} Image ${index + 1}`}
                                            className="w-full object-cover"
                                        />
                                    </CarouselItem>
                                ))}

                            </CarouselContent>
                        </Carousel>
                        {isEditing && (
                            <div className="flex flex-col gap-4">
                                <Label className="text-left">Images</Label>
                                <div {...getRootProps()} className="col-span-3 border-2 border-dashed p-4 text-center">
                                    <input {...getInputProps()} />
                                    {
                                        isDragActive ?
                                            <p>Drop the images here ...</p> :
                                            <p>Drag & drop some files here, or click to select files</p>
                                    }
                                </div>
                            </div>
                        )}
                        <div className="grid w-full max-w-sm items-center gap-1.5">
                            <Label htmlFor="productName">Product Name</Label>
                            <Input
                                type="text"
                                id="productName"
                                name="productName"
                                value={editedProduct.productName}
                                onChange={handleInputChange}
                                disabled={!isEditing}
                            />
                        </div>
                        <div className="grid w-full max-w-sm items-center gap-1.5">
                            <Label htmlFor="brandName">Brand</Label>
                            <Input
                                type="text"
                                id="brandName"
                                name="brandName"
                                value={editedProduct.brandName}
                                onChange={handleInputChange}
                                disabled={!isEditing}
                            />
                        </div>
                        <div className="grid w-full max-w-sm items-center gap-1.5">
                            <Label htmlFor="category">Category</Label>
                            <Input
                                type="text"
                                id="category"
                                name="category"
                                value={editedProduct.category}
                                onChange={handleInputChange}
                                disabled={!isEditing}
                            />
                        </div>
                        <div className="grid w-full max-w-sm items-center gap-1.5">
                            <Label htmlFor="subcategory">Subcategory</Label>
                            <Input
                                type="text"
                                id="subcategory"
                                name="subcategory"
                                value={editedProduct.subcategory}
                                onChange={handleInputChange}
                                disabled={!isEditing}
                            />
                        </div>
                        <div className="grid w-full max-w-sm items-center gap-1.5">
                            <Label htmlFor="price">Price</Label>
                            <Input
                                type="number"
                                id="price"
                                name="price"
                                value={editedProduct.price}
                                onChange={handleInputChange}
                                disabled={!isEditing}
                            />
                        </div>
                        <div className="grid w-full max-w-sm items-center gap-1.5">
                            <Label htmlFor="sellingPrice">Selling Price</Label>
                            <Input
                                type="number"
                                id="sellingPrice"
                                name="sellingPrice"
                                value={editedProduct.sellingPrice}
                                onChange={handleInputChange}
                                disabled={!isEditing}
                            />
                        </div>
                        <div className="grid w-full gap-1.5">
                            <Label htmlFor="description">Description</Label>
                            <Textarea
                                id="description"
                                name="description"
                                value={editedProduct.description}
                                onChange={handleInputChange}
                                disabled={!isEditing}
                            />
                        </div>
                    </div>
                )}
                <DialogFooter>
                    {isEditing && (
                        <Button type="submit" onClick={handleSubmit}>Save changes</Button>
                    )}
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
