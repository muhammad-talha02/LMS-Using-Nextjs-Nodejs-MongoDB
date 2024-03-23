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
    changePassword: builder.mutation({
      query(data) {
        return {
          url: "updatePassword",
          method: "PUT",
          body: data,
          credentials: "include" as const,
        };
      },
    }),

    //? Get All Users
    getAllUsers: builder.query({
      query() {
        return {
          url: "get-all-users",
          method: "GET",
          credentials: "include" as const,
        };
      },
      providesTags:['GetAllUsers']
    }),

    //? Get All Users
    deleteUser: builder.mutation({
      query(id) {
        return {
          url: `delete-user/${id}`,
          method: "DELETE",
          credentials: "include" as const,
        };
      },
      invalidatesTags:['GetAllUsers']
    }),
  }),
});

export const {
  useUpdateAvatarMutation,
  useUpdateUserInfoMutation,
  useChangePasswordMutation,
  useGetAllUsersQuery,
  useDeleteUserMutation
} = userApi;
