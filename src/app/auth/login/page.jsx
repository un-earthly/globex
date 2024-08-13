"use client"
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setCurrentUser } from '@/lib/features/userSlice';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const dispatch = useDispatch();
    const router = useRouter();

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            // Simulate fetching user data from localStorage
            const storedUsers = JSON.parse(localStorage.getItem('users')) || [];

            // Find the user with matching email and password
            const user = storedUsers.find((u) => u.email === email && u.password === password);

            if (!user) {
                throw new Error('Invalid email or password');
            }

            // Simulate generating a token
            const token = 'dummy-auth-token';

            // Store the token in local storage
            localStorage.setItem('token', token);

            // Update Redux state with the user data
            dispatch(setCurrentUser(user));

            // Redirect to home page or dashboard
            router.push('/');
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex flex-col justify-center py-12 sm:px-6 lg:px-8">


            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                <Card className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                    <CardHeader>
                        <CardTitle className="text-2xl font-bold text-center">Login</CardTitle>
                        <CardDescription className="text-center">Enter your credentials to login</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleLogin} className="space-y-6">
                            <div className="space-y-1">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="Enter your email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="space-y-1">
                                <Label htmlFor="password">Password</Label>
                                <Input
                                    id="password"
                                    type="password"
                                    placeholder="Enter your password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                            </div>
                            {error && (
                                <Alert variant="destructive">
                                    <AlertDescription>{error}</AlertDescription>
                                </Alert>
                            )}
                            <Button type="submit" className="w-full" disabled={loading}>
                                {loading ? (
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        Signing In...
                                    </>
                                ) : (
                                    'Sign In'
                                )}
                            </Button>
                        </form>
                    </CardContent>
                    <CardFooter className="mt-6 items-center justify-center">
                        <p className="text-sm text-gray-600">
                            Don&apos;t have an account?{' '}
                            <Link href="/auth/register" className="font-medium text-blue-600 hover:text-blue-500">
                                Sign up
                            </Link>
                        </p>
                    </CardFooter>
                </Card>

            </div>
        </div>
    );
};

export default LoginPage;