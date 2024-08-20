// app/checkout/page.jsx
"use client"
import { useState } from 'react';
import CheckoutForm from '@/components/CheckoutForm';
import OrderSummary from '@/components/OrderSummary';
import SuccessPage from '@/components/SuccessPage';
import { Container } from '@/components/ui/container';

export default function Checkout() {
    const [step, setStep] = useState(1);
    const [isComplete, setIsComplete] = useState(false);
    const [orderData, setOrderData] = useState(null);

    const nextStep = () => setStep(step + 1);
    const prevStep = () => setStep(step - 1);

    const handleComplete = (data) => {
        setOrderData(data);
        setIsComplete(true);
    };

    if (isComplete) {
        return <SuccessPage orderData={orderData} />;
    }

    return (
        <Container>
            <h1 className="text-3xl font-bold mb-6">Checkout</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="md:col-span-2">
                    <CheckoutForm
                        step={step}
                        nextStep={nextStep}
                        prevStep={prevStep}
                        onComplete={handleComplete}
                    />
                </div>
                <div>
                    <OrderSummary />
                </div>
            </div>
        </Container >
    );
}