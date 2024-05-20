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
  isDisplay: boolean;
}

export const QuestionBlock: FC<QuestionBlockProps> = ({
  answers,
  questionsSorted,
  isDisplay,
}) => {
  const users = useSelector((state: RootState) => selectUsers(state));

  const questionList = questionsSorted.filter(answers);

  const isEmptyQuestion = questionList.length === 0;

  return (
    <div className={`question-block  ${!isDisplay && "display-none"}`}>
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
