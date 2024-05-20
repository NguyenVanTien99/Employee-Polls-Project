import { FC } from "react";
import { QuestionInfo } from "../QuestionInfo";
import { useQuestionDetail } from "./Module/hooks/useQuestionDetail";
import "./style.css";

export const QuestionDetail: FC = () => {
  const { questionInfoData, userAvatarURL, userId } = useQuestionDetail();

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
