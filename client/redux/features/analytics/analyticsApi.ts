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

    //? Get Orders Analytics
    getOrdersAnalytics: builder.query({
      query() {
        return {
          url: "get-orders-analytics",
          method: "GET",
          credentials: "include" as const,
        };
      },
    }),

    //? Get Users Analytics
    getUsersAnalytics: builder.query({
      query() {
        return {
          url: "get-users-analytics",
          method: "GET",
          credentials: "include" as const,
        };
      },
    }),
  }),
});

export const {
  useGetCourseAnalyticsQuery,
  useGetOrdersAnalyticsQuery,
  useGetUsersAnalyticsQuery,
} = analyticsApi;
