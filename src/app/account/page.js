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

export default function AccountPage() {
    const user = useSelector(state => state.user.currentUser)

    if (!user) {
        return <div>Please log in to view your account.</div>
    }

    return (
        <div>
            <h1 className="text-3xl font-bold mb-6">My Account</h1>
            <Card>
                <CardHeader>
                    <CardTitle>{user.name}</CardTitle>
                    <CardDescription>{user.email}</CardDescription>
                </CardHeader>
                <CardContent>
                    <p>Account details here...</p>
                </CardContent>
                <CardFooter>
                    <Button>Edit Profile</Button>
                </CardFooter>
            </Card>
        </div>
    )
}