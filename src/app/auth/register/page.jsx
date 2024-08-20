"use client"
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setCurrentUser } from '@/lib/features/userSlice';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useSignUpMutation } from '@/lib/features/api';

const SignUpPage = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [customError, setCustomError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const dispatch = useDispatch();
    const router = useRouter();

    const [signUp, { isLoading, error }] = useSignUpMutation();

    useEffect(() => {
        // Check if user is already logged in
        const user = localStorage.getItem('user');
        if (user) {
            router.replace('/');
        }
    }, [router]);

    const handleSignUp = async (e) => {
        e.preventDefault();
        setCustomError('');
        setSuccessMessage('');

        if (password !== confirmPassword) {
            setCustomError('Passwords do not match.');
            return;
        }

        try {
            const response = await signUp({ name, email, password }).unwrap();
            console.log('Signup response:', response);
            if (response && response.user) {
                // Store user in localStorage
                localStorage.setItem('user', JSON.stringify(response.user));
                // Update Redux state
                dispatch(setCurrentUser(response.user));
                setSuccessMessage('Registration successful! Redirecting to home...');
                console.log('User set in localStorage and Redux. Navigating to home...');
                setTimeout(() => {
                    router.replace('/');
                }, 1000);
            } else {
                setCustomError('Invalid response from server');
            }
        } catch (err) {
            console.error('Failed to sign up:', err);
            setCustomError(err.data?.message || 'An error occurred during sign up. Please try again.');
        }
    };

    return (
        <div className="min-h-screen flex flex-col justify-center py-12 sm:px-6 lg:px-8">
            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                <Card className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                    <CardHeader>
                        <CardTitle className="text-2xl font-bold text-center">Sign Up</CardTitle>
                        <CardDescription className="text-center">Enter your details to create an account</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSignUp} className="space-y-6">
                            <div className="space-y-2">
                                <Label htmlFor="name">Full Name</Label>
                                <Input
                                    id="name"
                                    type="text"
                                    placeholder="Enter your full name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="space-y-2">
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
                            <div className="space-y-2">
                                <Label htmlFor="password">Password</Label>
                                <Input
                                    id="password"
                                    type="password"
                                    placeholder="Create a password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="confirmPassword">Confirm Password</Label>
                                <Input
                                    id="confirmPassword"
                                    type="password"
                                    placeholder="Confirm your password"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    required
                                />
                            </div>
                            {(error || customError) && (
                                <Alert variant="destructive">
                                    <AlertDescription>{customError || error.data?.message || 'An error occurred'}</AlertDescription>
                                </Alert>
                            )}
                            {successMessage && (
                                <Alert variant="success">
                                    <AlertDescription>{successMessage}</AlertDescription>
                                </Alert>
                            )}
                            <Button type="submit" className="w-full" disabled={isLoading}>
                                {isLoading ? (
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        Signing Up...
                                    </>
                                ) : (
                                    'Sign Up'
                                )}
                            </Button>
                        </form>
                    </CardContent>
                    <CardFooter className="mt-6 items-center justify-center">
                        <p className="text-sm text-gray-600">
                            Already have an account?{' '}
                            <Link href="/auth/login" className="font-medium text-blue-600 hover:text-blue-500">
                                Login
                            </Link>
                        </p>
                    </CardFooter>
                </Card>
            </div>
        </div>
    );
};

export default SignUpPage;