"use client"
import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useGetUserDetailsQuery } from '@/lib/features/api'

export default function UserProfile() {
    const { data, isLoading } = useGetUserDetailsQuery()
    const user = data?.data
    const [isEditing, setIsEditing] = useState(false)

    const handleSave = () => {
        console.log("Saving user information:", user)
        setIsEditing(false)
    }

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        })
    }
    if (isLoading) {
        return <p>Loading user information...</p>
    }
    return (
        <div className="container mx-auto px-4 py-8">
            <Card className="max-w-md mx-auto">
                <CardHeader>
                    <div className="flex items-center space-x-4">
                        <Avatar className="w-20 h-20">
                            <AvatarImage src={`https://api.dicebear.com/6.x/initials/svg?seed=${user.name}`} alt={user.name} />
                            <AvatarFallback>{user.name.charAt(0).toUpperCase()}</AvatarFallback>
                        </Avatar>
                        <div>
                            <CardTitle>{user.name}</CardTitle>
                            <CardDescription>{user.role}</CardDescription>
                        </div>
                    </div>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="name">Name</Label>
                        <Input
                            id="name"
                            value={user.name}
                            onChange={(e) => setUser({ ...user, name: e.target.value })}
                            disabled={!isEditing}
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                            id="email"
                            value={user.email}
                            onChange={(e) => setUser({ ...user, email: e.target.value })}
                            disabled={!isEditing}
                        />
                    </div>
                    <div className="space-y-2">
                        <Label>Account Created</Label>
                        <p className="text-sm text-muted-foreground">{formatDate(user.createdAt)}</p>
                    </div>
                    <div className="space-y-2">
                        <Label>Last Updated</Label>
                        <p className="text-sm text-muted-foreground">{formatDate(user.updatedAt)}</p>
                    </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                    {isEditing ? (
                        <>
                            <Button onClick={handleSave}>Save Changes</Button>
                            <Button variant="outline" onClick={() => setIsEditing(false)}>Cancel</Button>
                        </>
                    ) : (
                        <Button onClick={() => setIsEditing(true)}>Edit Profile</Button>
                    )}
                </CardFooter>
            </Card>
        </div>
    )
}