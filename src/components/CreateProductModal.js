import { useCallback, useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { useGetTopCategoriesQuery, useUploadProductMutation } from '@/lib/features/api';
import { useDropzone } from 'react-dropzone';
import axios from 'axios';

export function CreateProductModal({ children }) {
    const [open, setOpen] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [selectedSubcategory, setSelectedSubcategory] = useState('');
    const { data: category, isLoading: categoryloading, isSuccess: categorysuccess, isError: categoryerror } = useGetTopCategoriesQuery();
    const categories = category?.categories;

    const selectedCategoryObj = categories?.find((category) => category._id === selectedCategory);

    const [formData, setFormData] = useState({
        productName: '',
        brandName: '',
        category: '',
        productImage: [],
        description: '',
        price: 0,
        sellingPrice: 0,
        subcategory: '',
    });
    const [images, setImages] = useState([]);
    const [uploadProduct, { isLoading }] = useUploadProductMutation();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const imageBBKey = '8df99c2ddfe4a2510f423bacf6e99ac2';

    const uploadImages = async (files) => {
        const uploadedImages = await Promise.all(
            files.map(async (file) => {
                const formData = new FormData();
                formData.append('image', file);

                try {
                    const res = await axios.post(`https://api.imgbb.com/1/upload?key=${imageBBKey}`, formData);
                    return res.data.data.url;
                } catch (err) {
                    console.error('Image upload failed:', err);
                    return null;
                }
            })
        );

        return uploadedImages.filter((url) => url !== null);
    };

    const onDrop = useCallback(async (acceptedFiles) => {
        const uploadedImages = await uploadImages(acceptedFiles);
        setImages((prevImages) => [...prevImages, ...uploadedImages]);
    }, []);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop, accept: 'image/*' });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const productData = { ...formData, productImage: images };
            await uploadProduct(productData).unwrap();
            alert('Product uploaded successfully!');
            setOpen(false);
        } catch (err) {
            console.error('Failed to upload product:', err);
        }
    };

    const handleSelectChange = (value) => {
        setSelectedCategory(value);
        setFormData({ ...formData, category: value });
    };

    const handleSubcategoryChange = (value) => {
        setSelectedSubcategory(value);
        setFormData({ ...formData, subcategory: value });
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                {children}
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Create New Product</DialogTitle>
                    <DialogDescription>
                        Add a new product to your inventory. Click save when you&apos;re done.
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit}>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label className="text-right">Images</Label>
                            <div {...getRootProps()} className="col-span-3 border-2 border-dashed p-4 text-center">
                                <input {...getInputProps()} />
                                {
                                    isDragActive ?
                                        <p>Drop the images here ...</p> :
                                        <p>Drag & drop some files here, or click to select files</p>
                                }
                            </div>
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label className="text-right">Preview</Label>
                            <div className="col-span-3">
                                <div className="grid grid-cols-3">
                                    {images.length > 0 && images.map((url, index) => (
                                        <img key={index} src={url} alt={`Preview ${index + 1}`} className="w-20 h-20 mb-2 rounded-md" />
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="productName" className="text-right">
                                Product Name
                            </Label>
                            <Input
                                id="productName"
                                name="productName"
                                value={formData.productName}
                                onChange={handleInputChange}
                                className="col-span-3"
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="brandName" className="text-right">
                                Brand Name
                            </Label>
                            <Input
                                id="brandName"
                                name="brandName"
                                value={formData.brandName}
                                onChange={handleInputChange}
                                className="col-span-3"
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="description" className="text-right">
                                Description
                            </Label>
                            <Textarea
                                id="description"
                                name="description"
                                value={formData.description}
                                onChange={handleInputChange}
                                className="col-span-3"
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="price" className="text-right">
                                Price
                            </Label>
                            <Input
                                id="price"
                                name="price"
                                type="number"
                                value={formData.price}
                                onChange={handleInputChange}
                                className="col-span-3"
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="sellingPrice" className="text-right">
                                Selling Price
                            </Label>
                            <Input
                                id="sellingPrice"
                                name="sellingPrice"
                                type="number"
                                value={formData.sellingPrice}
                                onChange={handleInputChange}
                                className="col-span-3"
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="category" className="text-right">
                                Category
                            </Label>
                            <Select onValueChange={handleSelectChange}>
                                <SelectTrigger className="col-span-3">
                                    <SelectValue placeholder="Select a category" />
                                </SelectTrigger>
                                <SelectContent>
                                    {categories?.map(e => (
                                        <SelectItem key={e._id} value={e._id}>{e.name}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                        {selectedCategoryObj && (
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="subcategory" className="text-right">
                                    Subcategory
                                </Label>
                                <Select onValueChange={handleSubcategoryChange}>
                                    <SelectTrigger className="col-span-3">
                                        <SelectValue placeholder="Select a subcategory" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {selectedCategoryObj.subcategories?.map((subcategory, index) => (
                                            <SelectItem key={index} value={subcategory.slug}>
                                                {subcategory.name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                        )}
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="stock" className="text-right">
                                Stock
                            </Label>
                            <Input
                                id="stock"
                                name="stock"
                                type="number"
                                value={formData.stock}
                                onChange={handleInputChange}
                                className="col-span-3"
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="quantity" className="text-right">
                                Quantity
                            </Label>
                            <Input
                                id="quantity"
                                name="quantity"
                                type="number"
                                value={formData.quantity}
                                onChange={handleInputChange}
                                className="col-span-3"
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="status" className="text-right">
                                Status
                            </Label>
                            <Select
                                id="status"
                                name="status"
                                onValueChange={(value) => setFormData({ ...formData, status: value })}
                                className="col-span-3"
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Select a status" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="available">Available</SelectItem>
                                    <SelectItem value="out of stock">Out of Stock</SelectItem>
                                    <SelectItem value="discontinued">Discontinued</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                    <DialogFooter>
                        <Button type="submit" disabled={isLoading}>
                            {isLoading ? 'Saving...' : 'Save Product'}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
