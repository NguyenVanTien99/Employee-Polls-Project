import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import { BrowserRouter } from "react-router-dom";
import { setAuthedUser } from "./redux/action/authUser";

const Layout = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  );
};

describe("App", () => {
  it("should render the component", () => {
    const { container } = render(<Layout />);
    expect(container).toMatchSnapshot();
    expect(container).toBeDefined();
  });

  it("should display Login page when not logged in", () => {
    render(<Layout />);
    const element = screen.getByTestId("login-layout");
    expect(element).toBeInTheDocument();
  });

  it("should show home page when logged in", () => {
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

    render(<Layout />);

    const home = screen.getByTestId("home-layout");
    expect(home).toBeInTheDocument();
  });
});
