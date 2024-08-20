"use client"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useGetUserDetailsQuery } from "@/lib/features/api";

export default function Profile() {

    const { data, isFetching } = useGetUserDetailsQuery()

    const profile = data?.data
    console.log(data)
    if (profile) {
        return (
            <Card className="max-w-md mx-auto mt-10">
                <CardHeader>
                    <CardTitle className="text-center">{profile.name.first} {profile.name.last}</CardTitle>
                </CardHeader>
                <CardContent>
                    <img
                        className="rounded-full mx-auto mb-4"
                        src={profile.picture.large}
                        alt={`${profile.name.first} ${profile.name.last}`}
                    />
                    <table className="w-full text-sm">
                        <tbody>
                            <tr className="border-b">
                                <td className="font-semibold p-2">Cell:</td>
                                <td className="p-2">{profile.cell}</td>
                            </tr>
                            <tr className="border-b">
                                <td className="font-semibold p-2">Email:</td>
                                <td className="p-2">{profile.email}</td>
                            </tr>
                            <tr className="border-b">
                                <td className="font-semibold p-2">Country:</td>
                                <td className="p-2">{profile.location.country}</td>
                            </tr>
                            <tr className="border-b">
                                <td className="font-semibold p-2">City:</td>
                                <td className="p-2">{profile.location.city}</td>
                            </tr>
                            <tr className="border-b">
                                <td className="font-semibold p-2">State:</td>
                                <td className="p-2">{profile.location.state}</td>
                            </tr>
                            <tr className="border-b">
                                <td className="font-semibold p-2">Post Code:</td>
                                <td className="p-2">{profile.location.postcode}</td>
                            </tr>
                            <tr>
                                <td className="font-semibold p-2">Street Name:</td>
                                <td className="p-2">{profile.location.street.name}</td>
                            </tr>
                        </tbody>
                    </table>
                    <div className="mt-4 text-center">
                        <Button onClick={() => router.push("/")}>Back</Button>
                    </div>
                </CardContent>
            </Card>
        );
    }

    return null;
};
