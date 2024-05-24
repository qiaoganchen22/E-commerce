import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const cartApi = createApi({
  reducerPath: "cartApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_URL || "http://localhost:3000",
  }),
  endpoints: (builder) => ({
    getCart: builder.query({
      query: ({ token }) => ({
        url: "/api/cart",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }),
    }),
    addToCart: builder.mutation({
      query: ({productid,token}) => ({
        url: "/",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: {
          productid,
        },
      }),
    }),
    deleteCart: builder.mutation({
      //delete one item in cart
      query: ({id,token}) => ({
        url: "/",
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: {
          productid:id,
        },
      }),
    }),
    sessionAddToCart: builder.mutation({
      query: ({token,cart}) => ({
        url: "/api/cart/sessionCart",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: {
          cart,
        },
      }),
    }),
  }),
});

export const { useGetCartQuery, useAddToCartMutation, useDeleteCartMutation ,useSessionAddToCartMutation} =
  cartApi;
