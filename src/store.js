import { configureStore } from '@reduxjs/toolkit';
import productReducer from './lib/features/productSlice';
import cartReducer from './lib/features/cartSlice';
import userReducer from './lib/features/userSlice';
import wishlistReducer from './lib/features/wishlistSlice';

export const store = configureStore({
    reducer: {
        products: productReducer,
        cart: cartReducer,
        user: userReducer,
        wishlist: wishlistReducer,
    },
});