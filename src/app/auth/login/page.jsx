"use client"
import React, { useEffect, useState } from 'react';
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
import { useLoginMutation } from '@/lib/features/api';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [customError, setCustomError] = useState('');
    const dispatch = useDispatch();
    const router = useRouter();

    const [login, { isLoading, error }] = useLoginMutation();

    useEffect(() => {
        // Check if user is already logged in
        const user = localStorage.getItem('user');
        if (user) {
            router.push('/');
        }
    }, [router]);

    const handleLogin = async (e) => {
        e.preventDefault();
        setCustomError('');
        try {
            const response = await login({ email, password }).unwrap();
            console.log('Login response:', response);
            if (response) {
                // Store token in localStorage
                localStorage.setItem('token', response.data.token);
                // Store user in localStorage
                localStorage.setItem('user', JSON.stringify(response.data.user));
                // Update Redux state
                dispatch(setCurrentUser(response.data.user));
                console.log('User set in localStorage and Redux. Navigating to home...');
                router.replace('/');
            } else {
                setCustomError('Invalid response from server');
            }
        } catch (err) {
            console.error('Failed to log in:', err);
            setCustomError(err.data?.message || 'An error occurred during login. Please try again.');
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
                            {(error || customError) && (
                                <Alert variant="destructive">
                                    <AlertDescription>{customError || error.data?.message || 'An error occurred'}</AlertDescription>
                                </Alert>
                            )}
                            <Button type="submit" className="w-full" disabled={isLoading}>
                                {isLoading ? (
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