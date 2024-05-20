import { FC, useState } from "react";
import { useSelector } from "react-redux";
import { QuestionsState } from "../../redux/reducer/questions";
import { selectAuthedUser, selectQuestions } from "../../redux/selector/user";
import { RootState } from "../../redux/store";
import { QuestionBlock } from "../QuestionBlock";
import { get } from "lodash";
import "./style.css";

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

  const [answersTab, setAnsweredTab] = useState<string>("New Questions");

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

  const handleClick = (event: any) => {
    const innerText = event.target.innerText;
    setAnsweredTab(innerText);
  };

  return (
    <>
      <div className="tab-container">
        <button
          className={`questions-btn ${
            answersTab === "New Questions" && "questions-btn-active"
          }`}
          onClick={handleClick}
        >
          New Questions
        </button>
        <button
          className={`questions-btn ${
            answersTab === "Answered Questions" && "questions-btn-active"
          }`}
          onClick={handleClick}
        >
          Answered Questions
        </button>
      </div>
      <div className="questions-container" data-testid="home-layout">
        {questionBlockData.map(({ title, answers, id }) => (
          <QuestionBlock
            isDisplay={answersTab === title}
            answers={answers}
            questionsSorted={questionsSorted}
            title={title}
            key={id}
          />
        ))}
      </div>
    </>
  );
};
