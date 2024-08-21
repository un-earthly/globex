import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseQuery = fetchBaseQuery({
    baseUrl: 'http://localhost:5000/api/',
    prepareHeaders: (headers) => {
        const token = localStorage.getItem('token');
        if (token) {
            headers.set('Authorization', `Bearer ${token}`);
        }
        return headers;
    },
});

export const checkoutApi = createApi({
    reducerPath: 'checkoutApi',
    baseQuery,
    tagTypes: ['CartItems'],
    endpoints: (builder) => ({
        checkout: builder.mutation({
            query: (body) => ({
                url: 'checkout',
                method: 'POST',
                body,
            }),
            invalidatesTags: ['CartItems'],
        }),
    }),
});

export const { useCheckoutMutation } = checkoutApi;
