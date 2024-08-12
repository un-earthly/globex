'use client'

import { useSelector } from 'react-redux'
import { Button } from '@/components/ui/button'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle
} from '@/components/ui/card'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function AccountPage() {
    const user = useSelector(state => state.user.currentUser)
    const router = useRouter()

    useEffect(() => {
        if (!user) {
            router.push('/login')
        }
    }, [user, router])

    if (!user) {
        return null // or a loading spinner
    }

    return (
        <div className="container mx-auto max-w-2xl mt-10">
            <h1 className="text-3xl font-bold mb-6">My Account</h1>
            <Card>
                <CardHeader>
                    <CardTitle>{user.name}</CardTitle>
                    <CardDescription>{user.email}</CardDescription>
                </CardHeader>
                <CardContent>
                    <p>Account ID: {user.id}</p>
                    <p>Joined: {new Date(user.createdAt).toLocaleDateString()}</p>
                    {user.address && (
                        <p>Address: {user.address}</p>
                    )}
                </CardContent>
                <CardFooter>
                    <Button>Edit Profile</Button>
                </CardFooter>
            </Card>
        </div>
    )
}