import { configureStore } from '@reduxjs/toolkit';
import productReducer from './lib/features/productSlice';
import cartReducer from './lib/features/cartSlice';
import userReducer from './lib/features/userSlice';
import wishlistReducer from './lib/features/wishlistSlice';
import { categoryApi } from './lib/features/api.js';
import { checkoutApi } from './lib/features/checkoutApi';
import { orderApi } from './lib/features/orderApi';

export const store = configureStore({
    reducer: {
        products: productReducer,
        cart: cartReducer,
        user: userReducer,
        wishlist: wishlistReducer,
        [categoryApi.reducerPath]: categoryApi.reducer,
        [checkoutApi.reducerPath]: checkoutApi.reducer,
        [orderApi.reducerPath]: orderApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(categoryApi.middleware, checkoutApi.middleware, orderApi.middleware), // Add the API middleware
});
