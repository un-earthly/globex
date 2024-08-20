import { configureStore } from '@reduxjs/toolkit';
import productReducer from './lib/features/productSlice';
import cartReducer from './lib/features/cartSlice';
import userReducer from './lib/features/userSlice';
import wishlistReducer from './lib/features/wishlistSlice';
import { categoryApi } from './lib/features/api.js'; // Import the category API slice

export const store = configureStore({
    reducer: {
        products: productReducer,
        cart: cartReducer,
        user: userReducer,
        wishlist: wishlistReducer,
        [categoryApi.reducerPath]: categoryApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(categoryApi.middleware), // Add the API middleware
});
