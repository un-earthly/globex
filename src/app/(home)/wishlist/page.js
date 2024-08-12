"use client"
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Trash2, ShoppingCart, Heart } from "lucide-react";
import { clearWishlist, removeFromWishlist } from '@/lib/features/wishlistSlice';

const WishlistPage = () => {
    const wishlistItems = useSelector((state) => state.wishlist.items);
    const dispatch = useDispatch();

    const handleRemoveItem = (id) => {
        dispatch(removeFromWishlist(id));
    };

    const handleClearWishlist = () => {
        dispatch(clearWishlist());
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">My Wishlist</h1>
            {wishlistItems.length === 0 ? (
                <p className="text-gray-500">Your wishlist is empty.</p>
            ) : (
                <>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {wishlistItems.map((item) => (
                            <Card key={item.id} className="shadow-lg">
                                <CardContent className="p-4">
                                    <img
                                        src={item.image}
                                        alt={item.name}
                                        className="w-full h-48 object-cover mb-4 rounded"
                                    />
                                    <h2 className="text-lg font-semibold mb-2">{item.name}</h2>
                                    <p className="text-xl font-bold text-blue-600 mb-2">
                                        ${item.price.toFixed(2)}
                                    </p>
                                    <p className="text-sm text-gray-600 mb-4">{item.description}</p>
                                </CardContent>
                                <CardFooter className="flex justify-between p-4 bg-gray-50">
                                    <Button
                                        variant="destructive"
                                        size="sm"
                                        onClick={() => handleRemoveItem(item.id)}
                                    >
                                        <Trash2 className="mr-2 h-4 w-4" /> Remove
                                    </Button>
                                    <Button variant="default" size="sm">
                                        <ShoppingCart className="mr-2 h-4 w-4" /> Add to Cart
                                    </Button>
                                </CardFooter>
                            </Card>
                        ))}
                    </div>
                    <div className="mt-8 flex justify-end">
                        <Button variant="outline" onClick={handleClearWishlist}>
                            <Trash2 className="mr-2 h-4 w-4" /> Clear Wishlist
                        </Button>
                    </div>
                </>
            )}
        </div>
    );
};

export default WishlistPage;