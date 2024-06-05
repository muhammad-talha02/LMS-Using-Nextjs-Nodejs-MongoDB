import { apiSlice } from "../api/apiSlice";

export const notificationApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({

    //? Get ALl Notifications
    getAllNotifications: builder.query({
        query() {
            return {
                url: "get-all-notifications",
                method: "GET",
                credentials: "include" as const,
            };
        },
    }),

    //? Update Notifications
    updateNotifications: builder.mutation({
      query(id) {
        return {
          url: `update-notification/${id}`,
          method: "PUT",
          credentials: "include" as const,
        };
      },
    }),
  }),
});

export const { useGetAllNotificationsQuery ,useUpdateNotificationsMutation } = notificationApi;
