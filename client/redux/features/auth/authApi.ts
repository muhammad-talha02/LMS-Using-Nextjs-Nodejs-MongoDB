import { apiSlice } from "../api/apiSlice";
import { userRegisteration } from "./authSlice";

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
          console.log("REsgitration error", error);
        }
      },
    }),
    activation: builder.mutation({
      query: ({ activation_token, activation_code }) => ({
        url: "activate-user",
        method: "POST",
        body: { activation_token, activation_code },
      }),
    }),
  }),
});

export const { useRegisterMutation, useActivationMutation } = authApi;
