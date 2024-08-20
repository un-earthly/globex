"use client"
import ProductList from '@/components/ProductList'
import { Container } from '@/components/ui/container'
import { useGetSearchResultQuery } from '@/lib/features/api'
import { useSearchParams } from 'next/navigation'
import React from 'react'

export default function SearchPage() {
    const searchParams = useSearchParams()
    const searchQuery = searchParams.get('q') || ''

    const { data: searchResults, isFetching } = useGetSearchResultQuery(searchQuery, {
        skip: !searchQuery,
    })
    console.log(searchResults?.data)
    return (
        <Container>
            {isFetching && <div>Searching...</div>}
            {searchResults && (
                <ProductList products={searchResults?.data} />
            )}
        </Container>
    )
}
