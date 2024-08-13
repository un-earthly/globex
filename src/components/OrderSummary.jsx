// components/OrderSummary.jsx
import { useSelector } from "react-redux";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";

export default function OrderSummary() {
    const { items, total } = useSelector(state => state.cart);
    const subtotal = total;
    const tax = subtotal * 0.1; // Assuming 10% tax
    const shipping = 5.99; // Fixed shipping cost
    const grandTotal = subtotal + tax + shipping;

    return (
        <Card className="w-full max-w-md">
            <CardHeader>
                <CardTitle className="flex items-center justify-between">
                    <span>Order Summary</span>
                    <ShoppingCart className="h-5 w-5 text-gray-500" />
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                {items.map((item, index) => (
                    <div key={index} className="flex justify-between items-center text-sm">
                        <div className="flex items-center space-x-2">
                            <img src={item.image} alt={item.name} className="w-10 h-10 object-cover rounded" />
                            <span>{item.name} <span className="text-gray-500">x{item.quantity}</span></span>
                        </div>
                        <span className="font-medium">${(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                ))}
                <div className="border-t pt-4 space-y-2">
                    <div className="flex justify-between text-sm">
                        <span>Subtotal</span>
                        <span>${subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                        <span>Tax (10%)</span>
                        <span>${tax.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                        <span>Shipping</span>
                        <span>${shipping.toFixed(2)}</span>
                    </div>
                </div>
            </CardContent>
            <CardFooter className="bg-gray-50 py-3 px-6">
                <div className="w-full flex justify-between items-center">
                    <span className="font-semibold">Total</span>
                    <span className="text-lg font-bold">${grandTotal.toFixed(2)}</span>
                </div>
            </CardFooter>
        </Card>
    );
}