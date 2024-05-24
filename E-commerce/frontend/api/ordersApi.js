import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const ordersApi = createApi({
  reducerPath: "ordersApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_URL || "http://localhost:3000",
  }),
  endpoints: (builder) => ({
    getOrdersCustomer: builder.query({
      query: ({ token }) => ({
        url: "/api/orders/customer",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }),
    }),
    getOrdersAdmin: builder.mutation({
      query: ({ id, token }) => ({
        url: "/api/orders/customer",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: {
          id,
        },
      }),
    }),
    createOrder: builder.mutation({
      query: ({ token }) => ({
        url: "/",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }),
    }),
  }),
});

export const {
  useGetOrdersCustomerQuery,
  useGetOrdersAdminMutation,
  useCreateOrderMutation,
} = ordersApi;
