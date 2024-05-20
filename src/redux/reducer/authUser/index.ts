import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "../user";

export interface AuthedUserState {
  authedUser: User | null;
}

export const initialState: AuthedUserState = {
  authedUser: null,
};

// Create slice
export const authReducer = createSlice({
  name: "authedUser",
  initialState,
  reducers: {
    setAuthedUser(state, action: PayloadAction<User>) {
      state.authedUser = action.payload;
    },
    logoutAuthedUser(state) {
      state.authedUser = null;
    },
  },
});
