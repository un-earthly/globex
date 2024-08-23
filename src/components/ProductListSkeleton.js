import React from 'react'
import { Skeleton } from './ui/skeleton'

export default function ProductListSkeleton() {

    return <div className="space-y-4">
        {[...Array(5)].map((_, index) => (
            <div key={index} className="flex items-center justify-between p-4 bg-white rounded-lg shadow">
                <Skeleton className="h-8 w-8 rounded-full" />
                <div className="flex items-center space-x-4">
                    <Skeleton className="h-6 w-6 rounded-full" />
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-4 w-32" />
                    <Skeleton className="h-4 w-20" />
                    <Skeleton className="h-4 w-16" />
                    <Skeleton className="h-4 w-12" />
                </div>
            </div>
        ))}
    </div>
}