import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./reducer/authUser";
import { userReducer } from "./reducer/user";
import { questionsReducers } from "./reducer/questions";

export const store = configureStore({
  reducer: {
    authed: authReducer.reducer,
    users: userReducer.reducer,
    questions: questionsReducers.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
