import { FC } from "react";
import "./style.css";
import { RootState } from "../../redux/store";
import { useDispatch, useSelector } from "react-redux";
import { selectAuthedUser } from "../../redux/selector/user";
import { Link } from "react-router-dom";
import { logoutAuthedUser } from "../../redux/action/authUser";

export const NavBar: FC = () => {
  const user = useSelector((state: RootState) => selectAuthedUser(state));

  const dispatch = useDispatch();

  const handleLogout: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    dispatch(logoutAuthedUser());
  };

  return (
    <div>
      <ul className="nav-bar-container">
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/leaderboard">Leaderboard</Link>
        </li>
        <li>
          <Link to="/add">Add new question</Link>
        </li>
        <div className="user-info">
          {user?.id && (
            <>
              <span className="user-id">User: {user?.id}</span>
              <button className="logout-btn" onClick={handleLogout}>
                <i className="fas fa-sign-out-alt"></i> Logout
              </button>
            </>
          )}
        </div>
      </ul>
    </div>
  );
};
