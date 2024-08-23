import { BASE_URL } from '@/routes';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseQuery = fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders: (headers) => {
        const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
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
