import { FC } from "react";
import { QuestionInfo } from "../QuestionInfo";
import { useQuestionDetail } from "./Module/hooks/useQuestionDetail";
import "./style.css";
import { isEmpty } from "lodash";
import { Navigate } from "react-router-dom";

export const QuestionDetail: FC = () => {
  const { questionInfoData, userAvatarURL, userId } = useQuestionDetail();

  if (isEmpty(questionInfoData)) {
    return <Navigate to="/404" />;
  }

  return (
    <div>
      <h1>Question by {userId}</h1>
      <div>
        <img className="avatar" src={userAvatarURL} alt="Avatar" />
      </div>
      <div>
        <h2>Would you rather?</h2>
      </div>
      <div className="choose-btn-container">
        {questionInfoData.map((props) => (
          <QuestionInfo {...props} key={props.id} />
        ))}
      </div>
    </div>
  );
};
