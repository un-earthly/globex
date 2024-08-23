'use client'

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { Container } from '@/components/ui/container'
import ProductList from '@/components/ProductList'
import { useGetSearchResultQuery } from '@/lib/features/api'

export default function SearchPage() {
    const searchParams = useSearchParams()
    const [searchQuery, setSearchQuery] = useState('')
    const page = searchParams?.get('page') || 1
    const limit = searchParams?.get('limit') || 8

    useEffect(() => {
        const query = searchParams?.get('q') || ''
        setSearchQuery(query)
    }, [searchParams])

    const { data: searchResults, isFetching } = useGetSearchResultQuery(
        { q: searchQuery, page, limit },
        { skip: !searchQuery }
    )

    return (
        <Container>
            {isFetching && <div>Searching...</div>}
            {searchResults && (
                <ProductList products={searchResults.data} />
            )}
        </Container>
    )
}
