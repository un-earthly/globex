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

const SignUpPage = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const dispatch = useDispatch();
    const router = useRouter();

    const handleSignUp = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        if (password !== confirmPassword) {
            setError('Passwords do not match.');
            setLoading(false);
            return;
        }

        try {
            // Simulate fetching user data from localStorage
            const storedUsers = JSON.parse(localStorage.getItem('users')) || [];

            // Check if the email is already registered
            const existingUser = storedUsers.find((user) => user.email === email);

            if (existingUser) {
                throw new Error('User already exists');
            }

            // Create a new user
            const newUser = { name, email, password };

            // Simulate saving user data to localStorage
            storedUsers.push(newUser);
            localStorage.setItem('users', JSON.stringify(storedUsers));

            // Simulate generating a token
            const token = 'dummy-auth-token';

            // Store the token in local storage
            localStorage.setItem('token', token);

            // Update Redux state with the new user data
            dispatch(setCurrentUser(newUser));

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
                            {error && (
                                <Alert variant="destructive">
                                    <AlertDescription>{error}</AlertDescription>
                                </Alert>
                            )}
                            <Button type="submit" className="w-full" disabled={loading}>
                                {loading ? (
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