// app/checkout/page.jsx
"use client"
import { Suspense, useEffect, useState } from 'react';
import CheckoutForm from '@/components/CheckoutForm';
import OrderSummary from '@/components/OrderSummary';
import SuccessPage from '@/components/SuccessPage';
import { Container } from '@/components/ui/container';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';

export default function Checkout() {
    const [isComplete, setIsComplete] = useState(false);
    const [orderData, setOrderData] = useState(null);
    const dispatch = useDispatch();
    const router = useRouter();

    const handleComplete = (data) => {
        setOrderData(data);
        setIsComplete(true);
        router.push(`/order`);

    };
    useEffect(() => {
        dispatch(clearCart());
    }, [isComplete]);

    if (isComplete) {
        return <SuccessPage orderData={orderData} />;
    }

    return (
        <Suspense fallback={<div>Loading...</div>}>

            <Container>
                <h1 className="text-3xl font-bold mb-6">Checkout</h1>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="md:col-span-2">
                        <CheckoutForm onComplete={handleComplete} />
                    </div>
                    <div>
                        <OrderSummary />
                    </div>
                </div>
            </Container>
        </Suspense>

    );
}