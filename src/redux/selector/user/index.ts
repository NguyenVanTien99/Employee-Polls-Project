// selectors.ts
import { User, UsersState } from "../../reducer/user";
import { RootState } from "../../store";
import { QuestionsState } from "../../reducer/questions";

// Selector to get all users
export const selectUsers = (state: RootState): UsersState => state.users;

export const selectAuthedUser = (state: RootState): User | null =>
  state.authed.authedUser;

export const selectQuestions = (state: RootState): QuestionsState =>
  state.questions;
