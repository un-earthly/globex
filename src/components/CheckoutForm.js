// components/CheckoutForm.jsx
"use client"
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";

const step1Schema = z.object({
    fullName: z.string().min(2, { message: 'Full name must be at least 2 characters.' }),
    email: z.string().email({ message: 'Invalid email address.' }),
});

const step2Schema = z.object({
    address: z.string().min(5, { message: 'Address must be at least 5 characters.' }),
    city: z.string().min(2, { message: 'City must be at least 2 characters.' }),
    zipCode: z.string().min(5, { message: 'ZIP code must be at least 5 characters.' }),
});

const step3Schema = z.object({
    paymentMethod: z.enum(['credit_card', 'paypal', 'google_pay']),
});

const formSchema = z.object({
    ...step1Schema.shape,
    ...step2Schema.shape,
    ...step3Schema.shape,
});
export default function CheckoutForm({ step, nextStep, prevStep, onComplete }) {
    const [isSubmitting, setIsSubmitting] = useState(false);

    const getSchemaForStep = (step) => {
        switch (step) {
            case 1: return step1Schema;
            case 2: return step2Schema;
            case 3: return step3Schema;
            default: return formSchema;
        }
    };

    const form = useForm({
        resolver: zodResolver(getSchemaForStep(step)),
        defaultValues: {
            fullName: '',
            email: '',
            address: '',
            city: '',
            zipCode: '',
            paymentMethod: 'credit_card',
        },
    });

    const onSubmit = (data) => {
        console.log("Form submitted:", data);  // Add this line
        setIsSubmitting(true);
        // Simulate API call
        setTimeout(() => {
            console.log("After timeout:", data);
            setIsSubmitting(false);
            if (step < 3) {
                nextStep();
            } else {
                onComplete(data);
            }
        }, 2000);
    };
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <Card>
                    <CardHeader>
                        <CardTitle>
                            {step === 1 && "Shipping Information"}
                            {step === 2 && "Address Information"}
                            {step === 3 && "Payment Method"}
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {step === 1 && (
                            <>
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
                            </>
                        )}

                        {step === 2 && (
                            <>
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
                            </>
                        )}

                        {step === 3 && (
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
                                                    <FormLabel className="font-normal">
                                                        Credit Card
                                                    </FormLabel>
                                                </FormItem>
                                                <FormItem className="flex items-center space-x-3 space-y-0">
                                                    <FormControl>
                                                        <RadioGroupItem value="paypal" />
                                                    </FormControl>
                                                    <FormLabel className="font-normal">
                                                        PayPal
                                                    </FormLabel>
                                                </FormItem>
                                                <FormItem className="flex items-center space-x-3 space-y-0">
                                                    <FormControl>
                                                        <RadioGroupItem value="google_pay" />
                                                    </FormControl>
                                                    <FormLabel className="font-normal">
                                                        Google Pay
                                                    </FormLabel>
                                                </FormItem>
                                            </RadioGroup>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        )}
                    </CardContent>
                    <CardFooter className="flex justify-between">
                        {step > 1 && (
                            <Button type="button" variant="outline" onClick={prevStep}>
                                Previous
                            </Button>
                        )}
                        <Button type="submit" disabled={isSubmitting}>
                            {isSubmitting ? 'Processing...' : step === 3 ? 'Place Order' : 'Next'}
                        </Button>
                    </CardFooter>
                </Card>
            </form>
        </Form>
    );
}