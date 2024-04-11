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
  }),
});

export const { useGetAllOrdersQuery } = orderApi;
