import React from 'react';

const OrderSummary = ({ items, total }) => {
    return (
        <div>
            <h2>Order Summary</h2>
            <ul>
                {items.map((item, index) => (
                    <li key={index}>
                        {item.name} - {item.quantity} x ${item.price.toFixed(2)}
                    </li>
                ))}
            </ul>
            <h3>Total: ${total.toFixed(2)}</h3>
        </div>
    );
};

export default OrderSummary;
