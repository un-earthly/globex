'use client'

import { useState } from 'react'
import Image from 'next/image'

export default function ProductImageGallery({ images }) {
    const [mainImage, setMainImage] = useState(images[0])

    return (
        <div>
            <div className="mb-4">
                <Image src={mainImage} alt="Main product image" width={500} height={500} className="w-full h-auto" />
            </div>
            <div className="grid grid-cols-4 gap-2">
                {images.map((image, index) => (
                    <Image
                        key={index}
                        src={image}
                        alt={`Product image ${index + 1}`}
                        width={100}
                        height={100}
                        className={`w-full h-auto cursor-pointer ${image === mainImage ? 'border-2 border-blue-500' : ''}`}
                        onClick={() => setMainImage(image)}
                    />
                ))}
            </div>
        </div>
    )
}