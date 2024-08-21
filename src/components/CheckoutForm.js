"use client";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useCheckoutMutation } from "@/lib/features/checkoutApi";
import { useSelector, useDispatch } from "react-redux";
import { clearCart } from "@/lib/features/cartSlice";

const formSchema = z.object({
    fullName: z.string().min(2, { message: "Full name must be at least 2 characters." }),
    email: z.string().email({ message: "Invalid email address." }),
    address: z.string().min(5, { message: "Address must be at least 5 characters." }),
    city: z.string().min(2, { message: "City must be at least 2 characters." }),
    zipCode: z.string().min(4, { message: "ZIP code must be at least 4 characters." }),
    paymentMethod: z.enum(["credit_card", "paypal", "google_pay"]),
});

export default function CheckoutForm({ onComplete }) {
    const [submitCheckout, { isLoading, isSuccess, isError, error }] = useCheckoutMutation();
    const [formData, setFormData] = useState({});
    const cartItems = useSelector((state) => state.cart.items);
    const dispatch = useDispatch();

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            fullName: "",
            email: "",
            address: "",
            city: "",
            zipCode: "",
            paymentMethod: "credit_card",
        },
    });

    useEffect(() => {
        // Load user data from localStorage
        const userData = JSON.parse(localStorage.getItem("user"));
        if (userData) {
            form.setValue("fullName", userData.fullName);
            form.setValue("email", userData.email);
        }
    }, [form]);
    const onSubmit = async (data) => {
        const userId = JSON.parse(localStorage.getItem("user")).id;

        const orderData = {
            userId,
            items: cartItems.map((item) => ({
                productId: item._id,
                quantity: item.quantity,
            })),
            shippingAddress: {
                name: data.fullName,
                email: data.email,
                address: data.address,
                city: data.city,
                zipCode: data.zipCode,
            },
            paymentMethod: data.paymentMethod,
        };

        try {
            await submitCheckout(orderData).unwrap();
            onComplete(orderData);
            dispatch(clearCart());
        } catch (error) {
            console.error("Error submitting checkout:", error);
        }
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <Card>
                    <CardHeader>
                        <CardTitle className="text-lg items-center justify-center">Checkout</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <FormField
                            control={form.control}
                            name="fullName"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Full Name</FormLabel>
                                    <FormControl>
                                        <Input placeholder="John Doe" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input type="email" placeholder="john@example.com" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="address"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Address</FormLabel>
                                    <FormControl>
                                        <Input placeholder="123 Main St" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="city"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>City</FormLabel>
                                    <FormControl>
                                        <Input placeholder="New York" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="zipCode"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>ZIP Code</FormLabel>
                                    <FormControl>
                                        <Input placeholder="10001" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="paymentMethod"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <RadioGroup
                                            onValueChange={field.onChange}
                                            defaultValue={field.value}
                                            className="flex flex-col space-y-1"
                                        >
                                            <FormItem className="flex items-center space-x-3 space-y-0">
                                                <FormControl>
                                                    <RadioGroupItem value="credit_card" />
                                                </FormControl>
                                                <FormLabel className="font-normal">Credit Card</FormLabel>
                                            </FormItem>
                                            <FormItem className="flex items-center space-x-3 space-y-0">
                                                <FormControl>
                                                    <RadioGroupItem value="paypal" />
                                                </FormControl>
                                                <FormLabel className="font-normal">PayPal</FormLabel>
                                            </FormItem>
                                            <FormItem className="flex items-center space-x-3 space-y-0">
                                                <FormControl>
                                                    <RadioGroupItem value="google_pay" />
                                                </FormControl>
                                                <FormLabel className="font-normal">Google Pay</FormLabel>
                                            </FormItem>
                                        </RadioGroup>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </CardContent>
                    <CardFooter className="flex justify-end">
                        <Button type="submit" disabled={isLoading}>
                            {isLoading ? "Processing..." : "Place Order"}
                        </Button>
                    </CardFooter>
                </Card>
            </form>
            {isError && <div>Error submitting checkout: {error.data.message}</div>}
        </Form>
    );
}
