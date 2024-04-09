import { apiSlice } from "../api/apiSlice";

export const analyticsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    //? Get Course Analytics
    getCourseAnalytics: builder.query({
      query() {
        return {
          url: "get-courses-analytics",
          method: "GET",
          credentials: "include" as const,
        };
      },
    }),
  }),
});

export const { useGetCourseAnalyticsQuery } = analyticsApi;
