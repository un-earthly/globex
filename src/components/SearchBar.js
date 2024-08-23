import { useSearchParams } from 'next/navigation';
import { Input } from '../components/ui/input';
import React from 'react'

export default function SearchBar({
    handleSearch
}) {

    return (
        <Input
            type="search"
            placeholder="Search products..."
            onChange={(e) => { handleSearch(e); }}
            className="w-full border-transparent ring-0 border-0 focus-visible:ring-offset-0 focus-visible:ring-0 shadow-none pl-10 pr-4"
        />
    )
}
