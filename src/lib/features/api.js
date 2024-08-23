// src/services/categoryApi.js
import { BASE_URL } from '@/routes';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const categoryApi = createApi({
    baseQuery: fetchBaseQuery({
        baseUrl: BASE_URL,
        prepareHeaders: (headers) => {
            const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
            if (token) {
                headers.set('Authorization', `Bearer ${token}`);
            }
            return headers;
        },
    }),
    tagTypes: ['Categories', 'CategoryProducts', 'SubCategoryProducts', 'Products', 'Orders', 'UserDetails', 'Product'],
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (body) => ({
                url: 'signin',
                method: 'POST',
                body: body,
            })
        }),
        signUp: builder.mutation({
            query: (body) => ({
                url: 'signup',
                method: 'POST',
                body: body,
            })
        }),
        addCategory: builder.mutation({
            query: (newCategory) => ({
                url: 'add-category',
                method: 'POST',
                body: newCategory,
            }),
            invalidatesTags: ['Categories'],
        }),
        addSubcategory: builder.mutation({
            query: (newSubcategory) => ({
                url: 'add-subcategory',
                method: 'POST',
                body: newSubcategory,
            }),
            invalidatesTags: ['Categories'],
        }),
        getTopCategories: builder.query({
            query: () => 'categories',
            providesTags: ['Categories'],
        }),
        updateCategory: builder.mutation({
            query: ({ id, updatedCategory }) => ({
                url: `categories/${id}`,
                method: 'PUT',
                body: updatedCategory,
            }),
            invalidatesTags: ['Categories'],
        }),
        updateSubcategory: builder.mutation({
            query: ({ categoryId, subcategoryId, updatedSubcategory }) => ({
                url: `categories/${categoryId}/subcategories/${subcategoryId}`,
                method: 'PUT',
                body: updatedSubcategory,
            }),
            invalidatesTags: ['Categories'],
        }),
        deleteCategory: builder.mutation({
            query: (categoryId) => ({
                url: `delete-category/${categoryId}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Categories'],
        }),
        deleteSubcategory: builder.mutation({
            query: ({ categoryId, subcategoryId }) => ({
                url: `delete-subcategory/${categoryId}/${subcategoryId}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Categories'],
        }),
        getAllProducts: builder.query({
            query: ({ page = 1, limit = 8 } = {}) => ({
                url: 'get-product',
                method: 'GET',
                params: { page, limit }
            }),
            providesTags: ['Products'],
        }),
        getProductDetails: builder.query({
            query: (body) => ({
                url: 'product-details',
                method: 'POST',
                body: body
            }),
            providesTags: ['Products'],
        }),
        getDealOfTheDay: builder.query({
            query: () => ({
                url: 'deal-of-the-day',
                method: 'GET'
            })
        }),
        getSearchResult: builder.query({
            query: ({ q, page = 1, limit = 8 }) => ({
                url: `search?q=${q}&page=${page}&limit=${limit}`,
                method: 'GET',
            }),
        }),
        getCategoryProducts: builder.query({
            query: (category) => ({
                url: 'category-product',
                method: 'POST',
                body: { category },
            }),
            providesTags: ['CategoryProducts'],
        }),
        getSubCategoryProducts: builder.query({
            query: (params) => ({
                url: 'sub-category-product',
                method: 'POST',
                body: {
                    category: params.id,
                    subcategory: params.sid,
                },
            }),
            providesTags: ['SubCategoryProducts'],
        }),
        getUserDetails: builder.query({
            query: () => ({
                url: 'user-details',
                method: 'GET',
            }),
            providesTags: ['UserDetails'],
        }),
        uploadProduct: builder.mutation({
            query: (newProduct) => ({
                url: 'upload-product',
                method: 'POST',
                body: newProduct,
            }),
            invalidatesTags: ['Product'],
        }),
        deleteProduct: builder.mutation({
            query: (productId) => ({
                url: `delete-product/${productId}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Product'],
        }),
        updateProduct: builder.mutation({
            query: (updatedData) => ({
                url: `update-product`,
                method: 'POST',
                body: updatedData,
            }),
            invalidatesTags: ['Product'],
        }),
        getAdminOrders: builder.query({
            query: ({ page, limit }) => `get-admin-orders?page=${page}&limit=${limit}`,
            providesTags: ['Orders'],
        }),
        // Update order status
        updateOrderStatus: builder.mutation({
            query: ({ orderId, status }) => ({
                url: `/admin/orders/${orderId}/status`,
                method: 'PUT',
                body: { status },
            }),
            invalidatesTags: ['Orders'],
        }),

        // Search orders (can filter by userId, status, date range, and customer name)
        searchOrders: builder.query({
            query: (searchParams) => {
                const queryString = Object.keys(searchParams)
                    .map(key => `${key}=${encodeURIComponent(searchParams[key])}`)
                    .join('&');
                return `/admin/orders/search?${queryString}`;
            },
            providesTags: ['Orders'],
        }),
    }),
});

export const {
    useGetTopCategoriesQuery,
    useGetCategoryProductsQuery,
    useGetDealOfTheDayQuery,
    useGetSubCategoryProductsQuery,
    useGetAllProductsQuery,
    useGetSearchResultQuery,
    useLoginMutation,
    useSignUpMutation,
    useGetUserDetailsQuery,
    useGetProductDetailsQuery,
    useUploadProductMutation,
    useDeleteProductMutation,
    useUpdateProductMutation,
    useAddCategoryMutation,
    useUpdateCategoryMutation,
    useUpdateSubcategoryMutation,
    useDeleteCategoryMutation,
    useDeleteSubcategoryMutation,
    useAddSubcategoryMutation,
    useSearchOrdersQuery,
    useUpdateOrderStatusMutation,
    useGetAdminOrdersQuery


} = categoryApi;