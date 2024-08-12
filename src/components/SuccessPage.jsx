// components/SuccessPage.jsx
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from 'next/link';
import { CheckCircle } from 'lucide-react';

export default function SuccessPage({ orderData }) {
    return (
        <div className="container mx-auto py-10 px-4">
            <Card className="max-w-3xl mx-auto shadow-lg">
                <CardHeader className="bg-green-50 border-b border-green-100">
                    <div className="flex items-center justify-center space-x-2">
                        <CheckCircle className="w-8 h-8 text-green-600" />
                        <CardTitle className="text-3xl font-bold text-green-600">
                            Order Placed Successfully!
                        </CardTitle>
                    </div>
                </CardHeader>
                <CardContent className="space-y-6 pt-6">
                    <p className="text-center text-lg text-gray-700">
                        Thank you for your order, <span className="font-semibold">{orderData.fullName}</span>.
                        Your order has been received and is being processed.
                    </p>
                    <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                        <h3 className="font-bold text-xl mb-4 text-gray-800">Order Details:</h3>
                        <dl className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                            <div>
                                <dt className="font-medium text-gray-500">Email</dt>
                                <dd className="mt-1 text-gray-900">{orderData.email}</dd>
                            </div>
                            <div>
                                <dt className="font-medium text-gray-500">Shipping Address</dt>
                                <dd className="mt-1 text-gray-900">{orderData.address}, {orderData.city}, {orderData.zipCode}</dd>
                            </div>
                            <div>
                                <dt className="font-medium text-gray-500">Payment Method</dt>
                                <dd className="mt-1 text-gray-900 capitalize">{orderData.paymentMethod.replace('_', ' ')}</dd>
                            </div>
                        </dl>
                    </div>
                </CardContent>
                <CardFooter className="flex justify-center pt-6">
                    <Link href="/">
                        <Button className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-6 rounded-full transition duration-300 ease-in-out transform hover:scale-105">
                            Return to Home
                        </Button>
                    </Link>
                </CardFooter>
            </Card>
        </div>
    );
}