import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    items: [],
};

const wishlistSlice = createSlice({
    name: 'wishlist',
    initialState,
    reducers: {
        addToWishlist: (state, action) => {
            if (!state.items.some(item => item._id === action.payload._id)) {
                state.items.push(action.payload);
            }
        },
        removeFromWishlist: (state, action) => {
            state.items = state.items.filter(item => item._id !== action.payload);
        },
        clearWishlist: (state) => {
            state.items = [];
        },
    },
});

export const { addToWishlist, removeFromWishlist, clearWishlist } = wishlistSlice.actions;

export default wishlistSlice.reducer;