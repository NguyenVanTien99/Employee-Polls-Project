import {
  cleanup,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { Login } from ".";
import { store } from "../../redux/store";
import { getInitialData } from "../../util/api";
import { receiveUsers } from "../../redux/action/user";
import { receiveQuestions } from "../../redux/action/questions";

const Layout = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    </Provider>
  );
};

afterEach(() => {
  cleanup();
});

describe("App", () => {
  it("should render the component", () => {
    const { container } = render(<Layout />);
    expect(container).toMatchSnapshot();
    expect(container).toBeDefined();
  });
  it("should clear input elements When input wrong user and clicking login button", async () => {
    await getInitialData().then(({ users, questions }) => {
      store.dispatch(receiveUsers({ users: users }));
      store.dispatch(receiveQuestions({ questions: questions }));
    });

    render(<Layout />);

    const home = screen.getByTestId("login-layout");
    expect(home).toBeInTheDocument();

    const usernameInput = screen.getByTestId("username-input");
    const passwordInput = screen.getByTestId("password-input");
    const loginButton = screen.getByTestId("login-button");

    fireEvent.change(usernameInput, { target: { value: "sarahedo" } });
    fireEvent.change(passwordInput, {
      target: { value: "password" },
    });
    expect(usernameInput).toHaveValue("sarahedo");
    expect(passwordInput).toHaveValue("password");
    fireEvent.click(loginButton);

    expect(usernameInput).toHaveValue("");
    expect(passwordInput).toHaveValue("");
  });

  it("should redirect to home page When input correct user and clicking login button", async () => {
    await getInitialData().then(({ users, questions }) => {
      store.dispatch(receiveUsers({ users: users }));
      store.dispatch(receiveQuestions({ questions: questions }));
    });

    render(<Layout />);

    const home = screen.getByTestId("login-layout");
    expect(home).toBeInTheDocument();

    const usernameInput = screen.getByTestId("username-input");
    const passwordInput = screen.getByTestId("password-input");
    const loginButton = screen.getByTestId("login-button");

    fireEvent.change(usernameInput, { target: { value: "sarahedo" } });
    fireEvent.change(passwordInput, {
      target: { value: "password123" },
    });
    expect(usernameInput).toHaveValue("sarahedo");
    expect(passwordInput).toHaveValue("password123");
    fireEvent.click(loginButton);

    await waitFor(() => {
      expect(window.location.pathname).toBe("/");
    });
  });
});
