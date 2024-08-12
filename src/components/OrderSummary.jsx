// components/OrderSummary.jsx
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default function OrderSummary({ items, total }) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent>
                {items.map((item, index) => (
                    <div key={index} className="flex justify-between mb-2">
                        <span>{item.name}</span>
                        <span>${item.price.toFixed(2)}</span>
                    </div>
                ))}
                <div className="border-t pt-2 mt-2">
                    <div className="flex justify-between font-semibold">
                        <span>Total</span>
                        <span>${total.toFixed(2)}</span>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}