import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { AddQuestion } from ".";
import { setAuthedUser } from "../../redux/action/authUser";
import { store } from "../../redux/store";
import { getInitialData } from "../../util/api";
import { receiveUsers } from "../../redux/action/user";
import { receiveQuestions } from "../../redux/action/questions";

const Layout = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <AddQuestion />
      </BrowserRouter>
    </Provider>
  );
};

beforeAll(() => {
  store.dispatch(
    setAuthedUser({
      id: "sarahedo",
      password: "password123",
      name: "Sarah Edo",
      avatarURL: "https://github.com/sarah.png",
      answers: {
        "8xf0y6ziyjabvozdd253nd": "optionOne",
        "6ni6ok3ym7mf1p33lnez": "optionOne",
        am8ehyc8byjqgar0jgpub9: "optionTwo",
        loxhs1bqm25b708cmbf3g: "optionTwo",
      },
      questions: ["8xf0y6ziyjabvozdd253nd", "am8ehyc8byjqgar0jgpub9"],
    })
  );

  getInitialData().then(({ users, questions }) => {
    store.dispatch(receiveUsers({ users: users }));
    store.dispatch(receiveQuestions({ questions: questions }));
  });
});

describe("AddQuestion", () => {
  it("should render the component", () => {
    const { container } = render(<Layout />);
    expect(container).toMatchSnapshot();
    expect(container).toBeDefined();
  });

  it("Should redirect to home page When input option and clicking submit button", async () => {
    render(<Layout />);

    const firstOptionLabel = screen.getByTestId("first-option-label");
    const secondOptionLabel = screen.getByTestId("second-option-label");
    expect(firstOptionLabel).toBeInTheDocument();
    expect(secondOptionLabel).toBeInTheDocument();

    const firstOptionInput = screen.getByTestId("first-option-input");
    const secondOptionInput = screen.getByTestId("second-option-input");
    fireEvent.change(firstOptionInput, { target: { value: "abc" } });
    fireEvent.change(secondOptionInput, {
      target: { value: "xyz" },
    });

    const submitButton = screen.getByText("Submit");
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(window.location.pathname).toBe("/");
    });
  });
});
