import { apiSlice } from "../api/apiSlice";

export const layoutApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getLayout: builder.query({
      query(type) {
        return {
          url: `get-layout/${type}`,
          method: "GET",
          credentials: "include" as const,
        };
      },
    }),
  }),
});

export const { useGetLayoutQuery } = layoutApi;
