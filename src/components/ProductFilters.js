'use client'

import { useState } from 'react'
import { Slider } from "@/components/ui/slider"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"

export default function ProductFilters() {
    const [priceRange, setPriceRange] = useState([0, 1000])
    const [categories, setCategories] = useState([])

    const handlePriceChange = (value) => {
        setPriceRange(value)
    }

    const handleCategoryChange = (category) => {
        setCategories(prev =>
            prev.includes(category)
                ? prev.filter(c => c !== category)
                : [...prev, category]
        )
    }

    return (
        <div className="space-y-6">
            <div>
                <h3 className="text-lg font-semibold mb-2">Price Range</h3>
                <Slider
                    min={0}
                    max={1000}
                    step={10}
                    value={priceRange}
                    onValueChange={handlePriceChange}
                />
                <div className="flex justify-between mt-2">
                    <span>${priceRange[0]}</span>
                    <span>${priceRange[1]}</span>
                </div>
            </div>

            <div>
                <h3 className="text-lg font-semibold mb-2">Categories</h3>
                {['Electronics', 'Clothing', 'Books', 'Home & Garden'].map(category => (
                    <div key={category} className="flex items-center space-x-2">
                        <Checkbox
                            id={category}
                            checked={categories.includes(category)}
                            onCheckedChange={() => handleCategoryChange(category)}
                        />
                        <Label htmlFor={category}>{category}</Label>
                    </div>
                ))}
            </div>

            <Button className="w-full">Apply Filters</Button>
        </div>
    )
}