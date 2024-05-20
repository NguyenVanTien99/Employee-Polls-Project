import { FC } from "react";
import {
  Question as QuestionType,
  QuestionsState,
} from "../../redux/reducer/questions";
import { Question } from "../Question";
import "./style.css";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { selectUsers } from "../../redux/selector/user";

interface QuestionBlockProps {
  questionsSorted: QuestionType[];
  answers: (question: QuestionsState) => boolean;
  title: string;
}

export const QuestionBlock: FC<QuestionBlockProps> = ({
  answers,
  questionsSorted,
  title,
}) => {
  const users = useSelector((state: RootState) => selectUsers(state));

  const questionList = questionsSorted.filter(answers);

  const isEmptyQuestion = questionList.length === 0;

  return (
    <div className="question-block">
      <div className="title">{title}</div>
      <ul className="question-container">
        {questionList.map((question) => (
          <li key={question.id}>
            <Question question={question} author={users[question.author]} />
          </li>
        ))}

        {isEmptyQuestion && <h1>Not Found Data</h1>}
      </ul>
    </div>
  );
};
