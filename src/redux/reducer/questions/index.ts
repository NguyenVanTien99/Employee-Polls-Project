import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Question {
  id: string;
  [key: string]: any;
}

export interface QuestionsState {
  [key: string]: Question;
}

const initialState: QuestionsState = {};

export const questionsReducers = createSlice({
  name: "questions",
  initialState,
  reducers: {
    receiveQuestions(
      state,
      action: PayloadAction<{ questions: QuestionsState }>
    ) {
      return {
        ...state,
        ...action.payload.questions,
      };
    },
    addQuestion(state, action: PayloadAction<{ question: Question }>) {
      state[action.payload.question.id] = action.payload.question;
    },
    addAnswerQuestion(
      state,
      action: PayloadAction<{ qid: string; answer: string; author: string }>
    ) {
      const { qid, answer, author } = action.payload;
      const question = state[qid];
      if (question) {
        question[answer] = {
          ...question[answer],
          votes: question[answer].votes.concat(author),
        };
      }
    },
  },
});
