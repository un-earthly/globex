import { Button } from "@/components/ui/button"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useCallback, useState } from "react"
import { useDropzone } from "react-dropzone"
import { Select, SelectContent, SelectValue, SelectItem, SelectTrigger } from "./ui/select"
import { Textarea } from "./ui/textarea"
import { useGetTopCategoriesQuery } from "@/lib/features/api"

export function ProductViewUpdateForm({ product, children, isEditing }) {
  const [open, setOpen] = useState()
  const [formData, setFormData] = useState(product)
  const { data: category, isLoading: categoryloading, isSuccess: categorysuccess, isError: categoryerror } = useGetTopCategoriesQuery();
  const categories = category?.categories;
  const [selectedCategory, setSelectedCategory] = useState('');
  const [isLoading] = useState(false)
  const handleSubmit = () => {

  };
  const selectedCategoryObj = categories?.find((category) => category._id === selectedCategory);

  const [images, setImages] = useState([])
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const onDrop = useCallback(async (acceptedFiles) => {
    const uploadedImages = await uploadImages(acceptedFiles);
    setImages((prevImages) => [...prevImages, ...uploadedImages]);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop, accept: 'image/*' });
  const handleSelectChange = (value) => {
    setSelectedCategory(value);
    setFormData({ ...formData, category: value });
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        {children}
      </AlertDialogTrigger>
      <AlertDialogContent className="sm:max-w-[425px]">
        <AlertDialogHeader>
          <AlertDialogTitle>{isEditing && "Edit "}Product Details</AlertDialogTitle>
        </AlertDialogHeader>
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
          <AlertDialogFooter>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? 'Saving...' : 'Save Product'}
            </Button>
          </AlertDialogFooter>
        </form>
      </AlertDialogContent>
    </AlertDialog>
  )
}
