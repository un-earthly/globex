// src/services/categoryApi.js
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const categoryApi = createApi({
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000/api/' }),
    tagTypes: ['Categories', 'CategoryProducts', 'SubCategoryProducts'],
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
        getTopCategories: builder.query({
            query: () => 'categories',
            providesTags: ['Categories'],
        }),
        getAllProducts: builder.query({
            query: () => ({
                url: 'get-product',
                method: 'GET'
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
            query: (q) => ({
                url: `search?q=${encodeURIComponent(q)}`,
                method: 'GET',
            }),
            providesTags: ['CategoryProducts'],
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
    useGetUserDetailsQuery

} = categoryApi;