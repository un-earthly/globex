import { useSelector } from "react-redux";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { ShoppingCart } from "lucide-react";

export default function OrderSummary() {
    const { items, total, discountedTotal } = useSelector(state => state.cart);
    const subtotal = discountedTotal;
    const tax = subtotal * 0.1;
    const shipping = 5.99;
    const grandTotal = subtotal + tax + shipping;

    if (items.length === 0) {
        return (
            <Card className="max-w-lg">
                <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                        <span>Order Summary</span>
                        <ShoppingCart className="h-5 w-5 text-gray-500" />
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <p>Your cart is empty.</p>
                </CardContent>
            </Card>
        );
    }

    return (
        <Card className="w-80">
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
                            <img src={item.productImage && item.productImage.length > 0 ? item.productImage[0] : ""} alt={item.name} className="w-10 h-10 object-cover rounded" />
                            <span>
                                {item.name} <span className="text-gray-500">x{item.quantity}</span>
                                <div className="flex space-x-2  text-gray-600">
                                    {item.sellingPrice !== item.price && (
                                        <span className="line-through text-sm">${item.price.toFixed(2)}</span>
                                    )}
                                    {/* <span className="text-red-600 font-semibold">${item.sellingPrice.toFixed(2)}</span> */}
                                </div>
                            </span>
                        </div>
                        <span className="font-medium">${(item.sellingPrice * item.quantity).toFixed(2)}</span>
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
