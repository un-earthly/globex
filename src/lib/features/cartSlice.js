import { createSlice } from '@reduxjs/toolkit';
import { loadCartFromLocalStorage, saveCartToLocalStorage } from '../utils';

const initialState = loadCartFromLocalStorage() || { items: [], total: 0, discountedTotal: 0 };

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const existingItem = state.items.find(item => item._id === action.payload._id);
            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                state.items.push({ ...action.payload, quantity: 1 });
            }
            updateTotals(state);
        },

        removeFromCart: (state, action) => {
            state.items = state.items.filter(item => item._id !== action.payload);
            updateTotals(state);
        },

        updateQuantity: (state, action) => {
            const { productId, quantity } = action.payload;
            const item = state.items.find(item => item._id === productId);
            if (item) {
                item.quantity = quantity;
            }
            updateTotals(state);
        },

        clearCart: (state) => {
            state.items = [];
            state.discountedTotal = 0;
            state.total = 0;
            saveCartToLocalStorage(state);
        },
    },
});

const updateTotals = (state) => {
    state.discountedTotal = state.items.reduce((total, item) => total + item.sellingPrice * item.quantity, 0);
    state.total = state.items.reduce((total, item) => total + item.price * item.quantity, 0);
    saveCartToLocalStorage(state);
};

export const { addToCart, removeFromCart, updateQuantity, clearCart } = cartSlice.actions;

export default cartSlice.reducer;
