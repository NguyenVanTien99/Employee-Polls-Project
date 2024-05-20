import { FC } from "react";
import { useSelector } from "react-redux";
import { QuestionsState } from "../../redux/reducer/questions";
import { selectAuthedUser, selectQuestions } from "../../redux/selector/user";
import { RootState } from "../../redux/store";
import { QuestionBlock } from "../QuestionBlock";
import { get } from "lodash";

export const Home: FC = () => {
  const questions = useSelector((state: RootState) => selectQuestions(state));

  const authedUser = useSelector((state: RootState) => selectAuthedUser(state));

  const questionsSorted = Object.values(questions).sort(
    (a, b) => b.timestamp - a.timestamp
  );

  const getOptionVoteOfUser = (question: QuestionsState, option: string) => {
    return get(question, `${option}.votes`).includes(get(authedUser, "id"));
  };

  const unanswered = (question: QuestionsState) => {
    const optionOneVoteOfUser = getOptionVoteOfUser(question, "optionOne");
    const optionTwoVoteOfUser = getOptionVoteOfUser(question, "optionTwo");

    return !optionOneVoteOfUser && !optionTwoVoteOfUser;
  };

  const answered = (question: QuestionsState) => {
    const optionOneVoteOfUser = getOptionVoteOfUser(question, "optionOne");
    const optionTwoVoteOfUser = getOptionVoteOfUser(question, "optionTwo");

    return optionOneVoteOfUser || optionTwoVoteOfUser;
  };

  const questionBlockData = [
    {
      title: "New Questions",
      answers: unanswered,
      id: 1,
    },
    {
      title: "Answered Questions",
      answers: answered,
      id: 2,
    },
  ];

  return (
    <div className="questions-container" data-testid="home-layout">
      {questionBlockData.map(({ title, answers, id }) => (
        <QuestionBlock
          answers={answers}
          questionsSorted={questionsSorted}
          title={title}
          key={id}
        />
      ))}
    </div>
  );
};
