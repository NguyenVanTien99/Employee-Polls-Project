import { FC } from "react";
import { Question as QuestionType } from "../../redux/reducer/questions";
import "./style.css";
import { get } from "lodash";

interface QuestionInfoProps {
  onclick: React.MouseEventHandler<HTMLButtonElement>;
  hasVoted: boolean;
  calcPercentage: (option: string, question?: QuestionType) => string;
  title: string;
  questionInfo?: QuestionType;
  option: string;
  hasVotedForOption: boolean;
}

export const QuestionInfo: FC<QuestionInfoProps> = ({
  onclick,
  hasVoted,
  questionInfo,
  calcPercentage,
  title,
  option,
  hasVotedForOption,
}) => {
  return (
    <button
      className={`${
        hasVotedForOption ? "gradient-green-btn" : "gradient-red-btn"
      }`}
      onClick={onclick}
      disabled={hasVoted}
    >
      <div>
        <p>{title}</p>
        {!hasVoted && <p>Click to choose !</p>}
        {hasVoted && (
          <p>
            Votes: {get(questionInfo, `${option}.votes`).length} (
            {calcPercentage(option, questionInfo)})
          </p>
        )}
      </div>
    </button>
  );
};
