"use client"
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";
import { addToWishlist } from '@/lib/features/wishlistSlice';

const AddToWishlistButton = ({ product, iconOnly = false }) => {
  const dispatch = useDispatch();
  const wishlistItems = useSelector((state) => state.wishlist.items);
  const isInWishlist = wishlistItems.some(item => item.id === product.id);

  const handleAddToWishlist = () => {
    dispatch(addToWishlist(product));
  };

  return (
    <Button
      variant={isInWishlist ? "secondary" : "outline"}
      className="ml-4"
      onClick={handleAddToWishlist}
      disabled={isInWishlist}
    >
      <Heart className={`h-4 w-4 ${iconOnly ? '' : 'mr-2'}`} fill={isInWishlist ? "currentColor" : "none"} />
      {!iconOnly && (isInWishlist ? 'In Wishlist' : 'Add to Wishlist')}
    </Button>
  );
};

export default AddToWishlistButton;