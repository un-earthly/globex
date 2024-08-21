import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const orderApi = createApi({
    reducerPath: 'orderApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:5000/api/',
        prepareHeaders: (headers) => {
            const token = localStorage.getItem('token');
            if (token) {
                headers.set('Authorization', `Bearer ${token}`);
            }
            return headers;
        },
    }),
    tagTypes: ['Orders'],
    endpoints: (builder) => ({
        getOrders: builder.query({
            query: () => 'get-all-orders',
            providesTags: ['Orders'],
        }),
        getOrder: builder.query({
            query: (id) => `get-order/${id}`,
            providesTags: ['Orders'],
        }),
    }),
});

export const { useGetOrdersQuery, useGetOrderQuery } = orderApi;