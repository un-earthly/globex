import { createSlice } from '@reduxjs/toolkit';
import { generateProduct } from '../faker';

const initialState = {
    products: [],
    featuredProducts: [],
    currentProduct: null,
    loading: false,
    error: null,
    hasMore: true,
};

const productSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
        setError: (state, action) => {
            state.error = action.payload;
        },
        setProducts: (state, action) => {
            state.products = action.payload;
        },
        addProducts: (state, action) => {
            state.products = [...state.products, ...action.payload];
        },
        setFeaturedProducts: (state, action) => {
            state.featuredProducts = action.payload;
        },
        setCurrentProduct: (state, action) => {
            state.currentProduct = action.payload;
        },
        setHasMore: (state, action) => {
            state.hasMore = action.payload;
        },
    },
});

export const {
    setLoading,
    setError,
    setProducts,
    addProducts,
    setFeaturedProducts,
    setCurrentProduct,
    setHasMore,
} = productSlice.actions;

export default productSlice.reducer;