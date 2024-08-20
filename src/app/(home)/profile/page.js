"use client"
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetUserDetailsQuery } from "@/lib/features/api";

export default function Profile() {
    const router = useRouter();
    const { data, isLoading, isError, error } = useGetUserDetailsQuery();
    const [imageError, setImageError] = useState(false);

    if (isLoading) {
        return <ProfileSkeleton />;
    }

    if (isError) {
        return (
            <Card className="max-w-md mx-auto mt-10">
                <CardContent className="p-6 text-center text-red-500">
                    <p className="text-lg font-semibold">Error loading profile</p>
                    <p className="mt-2">{error.message || 'An unexpected error occurred'}</p>
                </CardContent>
            </Card>
        );
    }

    const profile = data?.data;

    if (!profile) {
        return (
            <Card className="max-w-md mx-auto mt-10">
                <CardContent className="p-6 text-center text-gray-500">
                    <p className="text-lg font-semibold">No profile data available</p>
                </CardContent>
            </Card>
        );
    }

    return (
        <Card className="max-w-md mx-auto mt-10">
            <CardHeader>
                <CardTitle className="text-center">{profile.name}</CardTitle>
            </CardHeader>
            <CardContent>
                {!imageError && profile.profilePicture && (
                    <img
                        className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
                        src={profile.profilePicture}
                        alt={profile.name}
                        onError={() => setImageError(true)}
                    />
                )}
                {(imageError || !profile.profilePicture) && (
                    <div className="w-32 h-32 rounded-full mx-auto mb-4 bg-gray-200 flex items-center justify-center">
                        <span className="text-2xl">{profile.name.charAt(0).toUpperCase()}</span>
                    </div>
                )}
                <table className="w-full text-sm">
                    <tbody>
                        <tr className="border-b">
                            <td className="font-semibold p-2">Email:</td>
                            <td className="p-2">{profile.email}</td>
                        </tr>
                        <tr className="border-b">
                            <td className="font-semibold p-2">Phone:</td>
                            <td className="p-2">{profile.phone || 'N/A'}</td>
                        </tr>
                        <tr className="border-b">
                            <td className="font-semibold p-2">Address:</td>
                            <td className="p-2">{profile.address || 'N/A'}</td>
                        </tr>
                        {/* Add more fields as needed */}
                    </tbody>
                </table>
                <div className="mt-4 text-center">
                    <Button onClick={() => router.push("/")}>Back to Home</Button>
                </div>
            </CardContent>
        </Card>
    );
}

function ProfileSkeleton() {
    return (
        <Card className="max-w-md mx-auto mt-10">
            <CardHeader>
                <Skeleton className="h-8 w-3/4 mx-auto" />
            </CardHeader>
            <CardContent>
                <Skeleton className="w-32 h-32 rounded-full mx-auto mb-4" />
                <div className="space-y-2">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-full" />
                </div>
                <div className="mt-4 text-center">
                    <Skeleton className="h-10 w-24 mx-auto" />
                </div>
            </CardContent>
        </Card>
    );
}