import { apiSlice } from "../api/apiSlice";

export const userApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    updateAvatar: builder.mutation({
      query(data) {
        return {
          url: "updateAvatar",
          method: "PUT",
          body: data,
          credentials: "include" as const,
        };
      },
      invalidatesTags: ["geUser"],
    }),
    updateUserInfo: builder.mutation({
      query(data) {
        return {
          url: "updateUser",
          method: "PUT",
          body: data,
          credentials: "include" as const,
        };
      },
    }),
  }),
});

export const { useUpdateAvatarMutation, useUpdateUserInfoMutation } = userApi;
