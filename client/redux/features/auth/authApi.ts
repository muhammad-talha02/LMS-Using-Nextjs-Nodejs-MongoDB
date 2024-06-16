import { apiSlice } from "../api/apiSlice";
import { userLoading, userLoggedIn, userLoggedOut, userRegisteration } from "./authSlice";

type IRegistrationResponse = {
  message: string;
  activationToken: string;
};

type RegistrationData = {};

export const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // endpoints here

    register: builder.mutation<IRegistrationResponse, RegistrationData>({
      query: (data) => ({
        url: "registration",
        method: "POST",
        body: data,
        credentials: "include" as const,
      }),
      // function set State in redcuer
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          dispatch(
            userRegisteration({
              token: result.data.activationToken,
            })
          );
        } catch (error: any) {
        }
      },
    }),
    activation: builder.mutation({
      query: ({ activation_token, activation_code }) => ({
        url: "activation-user",
        method: "POST",
        body: { activation_token, activation_code },
      }),
    }),
    Login: builder.mutation({
      query: (data) => ({
        url: "login",
        method: "POST",
        body: data,
        credentials: "include" as const,
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        dispatch(userLoading({isLoading:true})
        );
        try {
          const result = await queryFulfilled;
          dispatch(
            userLoggedIn({
              token: result.data.accessToken,
              user: result.data.user,
              isLoading:false
            })
          );
        } catch (error) {}
      },
    }),
    socialAuth: builder.mutation({
      query: (data) => ({
        url: "social-auth",
        method: "POST",
        body: data,
        credentials: "include" as const,
      }),
      async onQueryStarted(args, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          dispatch(
            userLoggedIn({
              token: result.data.accessToken,
              user: result.data.user,
              isLoading:false
            })
          );
        } catch (error) {}
      },
    }),
    logout: builder.query({
      query() {
        return {
          url: "logout",
          method: "GET",
          credentials: "include" as const,
        };
      },
      async onQueryStarted(args, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          dispatch(userLoggedOut());
        } catch (error) {
          
        }
      },
    }),
  }),
});

export const {
  useRegisterMutation,
  useActivationMutation,
  useLoginMutation,
  useSocialAuthMutation,
  useLogoutQuery
} = authApi;
