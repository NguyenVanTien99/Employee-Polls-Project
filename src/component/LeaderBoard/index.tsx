import { FC } from "react";
import { RootState } from "../../redux/store";
import { useSelector } from "react-redux";
import { selectUsers } from "../../redux/selector/user";
import "./style.css";

export const LeaderBoard: FC = () => {
  const users = useSelector((state: RootState) => selectUsers(state));

  const convertedUser = Object.values(users).sort(
    (a, b) => Object.keys(b.answers).length - Object.keys(a.answers).length
  );

  return (
    <div>
      <h1>Leader board</h1>

      <table className="clean-table">
        <thead>
          <tr>
            <th>User</th>
            <th>Answered</th>
            <th>Created</th>
          </tr>
        </thead>
        <tbody>
          {convertedUser.map((user) => (
            <tr key={user.id}>
              <td>
                <span>{user.name}</span>
                <br />
                {user.id}
              </td>
              <td>{Object.keys(user.answers).length}</td>
              <td>{user.questions.length}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
