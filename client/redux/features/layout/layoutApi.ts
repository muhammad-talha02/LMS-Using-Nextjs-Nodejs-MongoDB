import { apiSlice } from "../api/apiSlice";

export const layoutApi:any = apiSlice.injectEndpoints({
  endpoints: (builder) => ({

    //? Get Layout
    getLayout: builder.query({
      query(type) {
        return {
          url: `get-layout/${type}`,
          method: "GET",
          credentials: "include" as const,
        };
      },
    }),

    //? Update Layout
    updateLayout: builder.mutation({
      query(data) {
        return {
          url: `update-layout`,
          method: "PUT",
          body:data,
          credentials: "include" as const,
        };
      },
    }),
  }),
});

export const { useGetLayoutQuery, useUpdateLayoutMutation } = layoutApi;
