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
  return (
    <Link to={"questions/" + question.id}>
      <div className="card">
        <img src={author?.avatarURL} alt={author.name} className="card-image" />
        <div className="card-content">
          <h2 className="card-title">{question.author}</h2>
          <p className="card-description">
            {new Date(question.timestamp).toDateString()}
          </p>
          <h4>Click to view detail</h4>
        </div>
      </div>
    </Link>
  );
};
