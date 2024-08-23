import React from 'react'
import { Card, CardContent } from './ui/card';

export default function ErrCard() {
    return (
        <Card>
            <CardContent className="p-6 text-center text-red-500">
                <p className="text-lg font-semibold">Error loading products</p>
                <p className="mt-2">{error.message || 'An unexpected error occurred'}</p>
            </CardContent>
        </Card>
    );
}
