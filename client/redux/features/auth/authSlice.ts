import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: "",
  user: "",
  isLoading: true,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    userRegisteration: (state, action: PayloadAction<{ token: string }>) => {
      state.token = action.payload.token;
      state.isLoading = false;
    },
    userLoggedIn: (
      state,
      action: PayloadAction<{ token: string; user: any; isLoading: boolean }>
    ) => {
      (state.token = action.payload.token), (state.user = action.payload.user);
      state.isLoading = action.payload.isLoading;
    },
    userLoggedOut: (state) => {
      (state.token = ""), (state.user = ""),(state.isLoading =false);
    },
    userLoading: (
      state,
      action: PayloadAction<{ token?: string; user?: any; isLoading: boolean }>
    ) => {
      state.isLoading = action.payload.isLoading;
    },
  },
});

export const { userRegisteration, userLoggedIn, userLoggedOut, userLoading } =
  authSlice.actions;

export default authSlice.reducer;
