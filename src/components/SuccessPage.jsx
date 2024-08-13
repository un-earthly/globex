// components/SuccessPage.jsx
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from 'next/link';
import { CheckCircle, Package, Truck, CreditCard } from 'lucide-react';

export default function SuccessPage({ orderData }) {
    return (
        <div className="container mx-auto py-12 px-4 min-h-screen">
            <Card className="max-w-4xl mx-auto shadow-lg overflow-hidden">
                <CardHeader className="bg-[#0064D2] text-white py-8">
                    <div className="flex flex-col items-center justify-center space-y-4">
                        <CheckCircle className="w-16 h-16" />
                        <CardTitle className="text-4xl font-bold text-center">
                            Order Placed Successfully!
                        </CardTitle>
                    </div>
                </CardHeader>
                <CardContent className="space-y-8 p-8 bg-white">
                    <p className="text-center text-xl text-gray-700">
                        Thank you for your order <span className="font-semibold">{orderData.fullName}</span>.
                        We&apos;ll send you a confirmation email shortly.
                    </p>
                    <div className="bg-gray-50 p-8 rounded-lg border border-gray-200">
                        <h3 className="font-bold text-2xl mb-6 text-[#0064D2] border-b pb-2">Order Details</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <OrderDetailItem
                                icon={<Package className="w-6 h-6 text-[#0064D2]" />}
                                title="Order Information"
                                details={[
                                    { label: "Name", value: orderData.fullName },
                                    { label: "Email", value: orderData.email },
                                ]}
                            />
                            <OrderDetailItem
                                icon={<Truck className="w-6 h-6 text-[#0064D2]" />}
                                title="Shipping Address"
                                details={[
                                    { label: "Address", value: orderData.address },
                                    { label: "City", value: orderData.city },
                                    { label: "Zip Code", value: orderData.zipCode },
                                ]}
                            />
                            <OrderDetailItem
                                icon={<CreditCard className="w-6 h-6 text-[#0064D2]" />}
                                title="Payment Method"
                                details={[
                                    { label: "Method", value: orderData.paymentMethod.replace('_', ' ') },
                                ]}
                            />
                        </div>
                    </div>
                </CardContent>
                <CardFooter className="flex justify-start space-x-2 p-8 bg-gray-50">
                    <Link href="/account">
                        <Button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-6 rounded transition duration-300 ease-in-out">
                            View Order
                        </Button>
                    </Link>
                    <Link href="/">
                        <Button className="border border-blue-500 bg-transparent text-blue-500 hover:bg-blue-500 hover:text-white font-semibold py-2 px-6 rounded transition duration-300 ease-in-out">
                            Continue Shopping
                        </Button>
                    </Link>
                </CardFooter>
            </Card>
        </div>
    );
}

function OrderDetailItem({ icon, title, details }) {
    return (
        <div className="space-y-4">
            <div className="flex items-center space-x-3">
                {icon}
                <h4 className="font-semibold text-lg text-[#0064D2]">{title}</h4>
            </div>
            <dl className="space-y-2">
                {details.map((detail, index) => (
                    <div key={index} className="flex flex-col">
                        <dt className="text-sm font-medium text-gray-500">{detail.label}</dt>
                        <dd className="mt-1 text-gray-900">{detail.value}</dd>
                    </div>
                ))}
            </dl>
        </div>
    );
}