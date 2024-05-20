import { FC } from "react";
import { Link } from "react-router-dom";
import { Question as QuestionType } from "../../redux/reducer/questions";
import { User } from "../../redux/reducer/user";
import "./style.css";

interface QuestionProps {
  question: QuestionType;
  author: User;
}

export const Question: FC<QuestionProps> = ({ question, author }) => {
  console.log("question", question);

  const questionContent = `Would you like ${question.optionOne.text} or ${question.optionTwo.text}`;

  return (
    <Link to={"questions/" + question.id}>
      <div className="card">
        <img src={author?.avatarURL} alt={author.name} className="card-image" />
        <div className="flip-card">
          <div className="flip-card-inner">
            <div className="flip-card-front">
              <div>
                <h3 className="card-title">{question.author}</h3>
                <p className="card-description">
                  {new Date(question.timestamp).toDateString()}
                </p>
              </div>
            </div>
            <div className="flip-card-back">
              <div>
                {" "}
                <h4 className="card-title">{questionContent}</h4>
                <h5>Click to view detail</h5>{" "}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};
