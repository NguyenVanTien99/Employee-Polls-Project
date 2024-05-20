import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface User {
  id: string;
  name: string;
  password: string;
  answers: {
    [key: string]: string;
  };
  questions: string[];
  avatarURL: string;
}

export interface UsersState {
  [key: string]: User;
}

export interface ReceiveUsersPayload {
  users: UsersState;
}

export interface AddAnswerUserPayload {
  authedUser: string;
  qid: string;
  answer: string;
}

export interface AddQuestionUserPayload {
  author: string;
  qid: string;
}

const initialState: UsersState = {};

export const userReducer = createSlice({
  name: "users",
  initialState,
  reducers: {
    receiveUsers(state, action: PayloadAction<ReceiveUsersPayload>) {
      return {
        ...state,
        ...action.payload.users,
      };
    },
    addAnswerUser(state, action: PayloadAction<AddAnswerUserPayload>) {
      const { authedUser, qid, answer } = action.payload;
      if (state[authedUser]) {
        state[authedUser].answers = {
          ...state[authedUser].answers,
          [qid]: answer,
        };
      }
    },
    addQuestionUser(state, action: PayloadAction<AddQuestionUserPayload>) {
      const { author, qid } = action.payload;
      if (state[author]) {
        state[author].questions = state[author].questions.concat(qid);
      }
    },
  },
});
