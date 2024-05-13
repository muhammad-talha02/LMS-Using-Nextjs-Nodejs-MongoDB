import { apiSlice } from "../api/apiSlice";

export const orderApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    //? Get All Orders By Admin
    getAllOrders: builder.query({
      query() {
        return {
          url: "get-all-orders",
          method: "GET",
          credentials: "include" as const,
        };
      },
    }),

    //? Get Stripe Publishable Key
    getStripePublishableKey: builder.query({
      query() {
        return {
          url: "payment/stripePublishableKey",
          method: "GET",
          credentials: "include" as const,
        };
      },
    }),
    //? Make a New Payment (Stripe)
    makeNewStripePayment: builder.mutation({
      query(data) {
        return {
          url: "payment/new",
          method: "POST",
          body:data,
          credentials: "include" as const,
        };
      },
    }),
    //? Create a New Order
    createOrder: builder.mutation({
      query(data) {
        return {
          url: "create-order",
          method: "POST",
          body:data,
          credentials: "include" as const,
        };
      },
      invalidatesTags:['geUser']
    }),
  }),
});

export const { useGetAllOrdersQuery , useGetStripePublishableKeyQuery , useMakeNewStripePaymentMutation , useCreateOrderMutation } = orderApi;
