import { Route, Routes } from "react-router-dom";
import "./App.css";
import { NavBar } from "./component/NavBar";
import { Login } from "./component/Login";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getInitialData } from "./util/api";
import { receiveUsers } from "./redux/action/user";
import { PrivateLayout } from "./component/PrivateLayout";
import { Home } from "./component/Home";
import { receiveQuestions } from "./redux/action/questions";
import { QuestionDetail } from "./component/QuestionDetail";
import { AddQuestion } from "./component/AddQuestion";
import { LeaderBoard } from "./component/LeaderBoard";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    getInitialData().then(({ users, questions }) => {
      dispatch(receiveUsers({ users: users }));
      dispatch(receiveQuestions({ questions: questions }));
    });
  }, [dispatch]);

  return (
    <div className="App">
      <NavBar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/"
          element={
            <PrivateLayout>
              <Home />
            </PrivateLayout>
          }
        />
        <Route
          path="/questions/:id"
          element={
            <PrivateLayout>
              <QuestionDetail />
            </PrivateLayout>
          }
        />
        <Route
          path="/add"
          element={
            <PrivateLayout>
              <AddQuestion />
            </PrivateLayout>
          }
        />
        <Route
          path="/leaderboard"
          element={
            <PrivateLayout>
              <LeaderBoard />
            </PrivateLayout>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
