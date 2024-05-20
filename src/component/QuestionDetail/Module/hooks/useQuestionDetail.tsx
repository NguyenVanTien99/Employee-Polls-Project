import { useDispatch, useSelector } from "react-redux";
import { Question as QuestionType } from "../../../../redux/reducer/questions";
import { RootState } from "../../../../redux/store";
import {
  selectAuthedUser,
  selectQuestions,
  selectUsers,
} from "../../../../redux/selector/user";
import { useNavigate, useParams } from "react-router-dom";
import { saveQuestionAnswer } from "../../../../util/api";
import { addAnswerQuestion } from "../../../../redux/action/questions";
import { addAnswerUser } from "../../../../redux/action/user";
import { get } from "lodash";

type questionDetailInfo = {
  questionInfoData: {
    id: number;
    calcPercentage: (option: string, question?: QuestionType) => string;
    hasVoted: any;
    onclick: React.MouseEventHandler<HTMLButtonElement>;
    title: string;
    questionInfo: QuestionType | undefined;
    option: string;
  }[];
  userId?: string;
  userAvatarURL?: string;
};

export const useQuestionDetail = (): questionDetailInfo => {
  const questions = useSelector((state: RootState) => selectQuestions(state));
  const authedUser = useSelector((state: RootState) => selectAuthedUser(state));
  const users = useSelector((state: RootState) => selectUsers(state));

  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const questionInfo = Object.values(questions).find(
    (question) => question.id === id
  );
  const questionAuthor = Object.values(users).find(
    (user) => user.id === get(questionInfo, "author")
  );

  const authedUserId = get(authedUser, "id", "");
  const questionInfoId = get(questionInfo, "id", "");

  const hasVotedForOptionOne = get(questionInfo, "optionOne.votes").includes(
    authedUserId
  );
  const hasVotedForOptionTwo = get(questionInfo, "optionTwo.votes").includes(
    authedUserId
  );
  const hasVoted = hasVotedForOptionOne || hasVotedForOptionTwo;

  const handleAddAnswer = (questionId: string | undefined, option: string) => {
    return saveQuestionAnswer(authedUserId, questionInfoId, option).then(() => {
      dispatch(
        addAnswerQuestion({
          author: authedUserId,
          qid: questionId || "",
          answer: option,
        })
      );
      dispatch(
        addAnswerUser({
          authedUser: authedUserId,
          qid: questionId || "",
          answer: option,
        })
      );
    });
  };

  const handleChooseOptionOne: React.MouseEventHandler<HTMLButtonElement> = (
    e
  ) => {
    e.preventDefault();
    handleAddAnswer(questionInfoId, "optionOne");
    navigate("/");
  };

  const handleChooseOptionTwo: React.MouseEventHandler<HTMLButtonElement> = (
    e
  ) => {
    e.preventDefault();
    handleAddAnswer(questionInfoId, "optionTwo");
    navigate("/");
  };

  const calcPercentage = (option: string, question?: QuestionType) => {
    if (!question) {
      return "";
    }

    const numberVoteOfOptionOne = get(question, "optionOne.votes").length;
    const numberVoteOfOptionTwo = get(question, "optionTwo.votes").length;

    const numberVotesTotal = numberVoteOfOptionOne + numberVoteOfOptionTwo;

    if (option === "optionOne") {
      return (numberVoteOfOptionOne / numberVotesTotal) * 100 + " %";
    }

    if (option === "optionTwo") {
      return (numberVoteOfOptionTwo / numberVotesTotal) * 100 + " %";
    }

    return "";
  };

  const questionInfoData = [
    {
      id: 1,
      calcPercentage,
      hasVoted,
      onclick: handleChooseOptionOne,
      title: questionInfo?.optionOne.text,
      questionInfo,
      option: "optionOne",
    },
    {
      id: 2,
      calcPercentage,
      hasVoted,
      onclick: handleChooseOptionTwo,
      title: questionInfo?.optionTwo.text,
      questionInfo,
      option: "optionTwo",
    },
  ];

  return {
    userId: get(questionAuthor, "id"),
    userAvatarURL: get(questionAuthor, "avatarURL"),
    questionInfoData,
  };
};