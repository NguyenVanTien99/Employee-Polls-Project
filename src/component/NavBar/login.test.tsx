import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { NavBar } from ".";
import { setAuthedUser } from "../../redux/action/authUser";
import { store } from "../../redux/store";

const Layout = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <NavBar />
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
});

describe("NavBar", () => {
  it("should render the component", () => {
    const { container } = render(<Layout />);
    expect(container).toMatchSnapshot();
    expect(container).toBeDefined();
  });

  it("should display nav bar when render layout", () => {
    render(<Layout />);

    const home = screen.queryByText("Home");
    const leaderBoard = screen.queryByText("Leaderboard");
    const addNewQuestion = screen.queryByText("Add new question");

    expect(home).toBeInTheDocument();
    expect(leaderBoard).toBeInTheDocument();
    expect(addNewQuestion).toBeInTheDocument();
  });
});
