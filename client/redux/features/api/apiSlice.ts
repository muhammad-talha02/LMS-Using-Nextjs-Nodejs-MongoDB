import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { userLoading, userLoggedIn } from "../auth/authSlice";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_SERVER_URL,
  }),
  tagTypes: ["geUser", "GetAllUsers", "GetAllCourses", "getCourseAccess"],
  endpoints: (builder) => ({
    refreshToken: builder.query({
      query: () => ({
        url: "refresh",
        method: "GET",
        credentials: "include" as const,
      }),
    }),
    loadUser: builder.query({
      query: () => ({
        url: "me",
        method: "GET",
        credentials: "include" as const,
      }),
      providesTags: ["geUser"],
      async onQueryStarted(args, { queryFulfilled, dispatch }) {
        dispatch(userLoading({ isLoading: true }));
        try {
          const result = await queryFulfilled;
          dispatch(
            userLoggedIn({
              token: result.data.token,
              user: result.data.user,
              isLoading: false,
            })
          );
        } catch (error) {}
      },
    }),
  }),
});

export const { useRefreshTokenQuery, useLoadUserQuery } = apiSlice;
