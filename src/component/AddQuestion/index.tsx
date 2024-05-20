import { FC, useState } from "react";
import { useNavigate } from "react-router-dom";
import { selectAuthedUser } from "../../redux/selector/user";
import { RootState } from "../../redux/store";
import { useDispatch, useSelector } from "react-redux";
import { saveQuestion } from "../../util/api";
import { addQuestion } from "../../redux/action/questions";
import { addQuestionUser } from "../../redux/action/user";
import "./style.css";

export const AddQuestion: FC = () => {
  const navigate = useNavigate();
  const [firstOption, setFirstOption] = useState("");
  const [secondOption, setSecondOption] = useState("");

  const handleFirstOptionChange: React.ChangeEventHandler<HTMLInputElement> = (
    e
  ) => {
    const value = e.target.value;
    setFirstOption(value);
  };

  const handleSecondOptionChange: React.ChangeEventHandler<HTMLInputElement> = (
    e
  ) => {
    const value = e.target.value;
    setSecondOption(value);
  };

  const authedUser = useSelector((state: RootState) => selectAuthedUser(state));

  const dispatch = useDispatch();

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    saveQuestion(firstOption, secondOption, authedUser).then((question) => {
      dispatch(addQuestion({ question }));
      dispatch(
        addQuestionUser({
          author: question.author,
          qid: question.id,
        })
      );
    });
    navigate("/");
  };

  return (
    <div>
      <h1>New Question</h1>
      <form onSubmit={handleSubmit} data-testid="new-question-layout">
        <div>
          <label data-testid="first-option-label">First Option</label>
          <div className="mt-1">
            <input
              className="clean-input"
              value={firstOption}
              onChange={handleFirstOptionChange}
              type="text"
              name="firstOption"
              id="firstOption"
              data-testid="first-option-input"
              required
            />
          </div>
        </div>

        <div className="mt-3">
          <label data-testid="second-option-label">Second Option</label>
          <div>
            <input
              className="clean-input"
              value={secondOption}
              onChange={handleSecondOptionChange}
              type="text"
              name="secondOption"
              id="secondOption"
              data-testid="second-option-input"
              required
            />
          </div>
        </div>

        <div>
          <button className="three-d-btn" type="submit">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};
