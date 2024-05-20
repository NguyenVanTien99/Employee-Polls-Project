import { FC, useState } from "react";
import "./style.css";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { selectAuthedUser, selectUsers } from "../../redux/selector/user";
import { setAuthedUser } from "../../redux/action/authUser";
import { Navigate } from "react-router-dom";

export const Login: FC = () => {
  const [username, setUsername] = useState("sarahedo");
  const [password, setPassword] = useState("password123");

  const dispatch = useDispatch();

  const users = useSelector((state: RootState) => selectUsers(state));
  const loggedIn = useSelector((state: RootState) => selectAuthedUser(state));

  if (loggedIn) {
    const urlParams = new URLSearchParams(window.location.search);
    const redirectUrl = urlParams.get("redirectTo");
    return <Navigate to={redirectUrl ? redirectUrl : "/"} />;
  }

  const handleUsername: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const value = e.target.value;
    setUsername(value);
  };

  const handlePassword: React.ChangeEventHandler<HTMLInputElement> = (e: {
    target: { value: any };
  }) => {
    const value = e.target.value;
    setPassword(value);
  };

  const handleSubmitFrom = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    const user = Object.values(users).find(
      (user) => user.id === username && user.password === password
    );

    if (!!user) {
      dispatch(setAuthedUser(user));
    }

    setUsername("");
    setPassword("");
  };

  return (
    <div className="login-container" data-testid="login-layout">
      <div className="login-box">
        <h2>Login</h2>
        <form onSubmit={handleSubmitFrom}>
          <div className="input-group">
            <label htmlFor="username">Username</label>
            <input
              value={username}
              type="text"
              id="username"
              name="username"
              onChange={handleUsername}
              data-testid="username-input"
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              value={password}
              type="password"
              id="password"
              name="password"
              onChange={handlePassword}
              data-testid="password-input"
              required
            />
          </div>
          <button
            type="submit"
            className="login-button"
            data-testid="login-button"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};
