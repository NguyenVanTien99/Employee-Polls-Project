import { FC } from "react";
import "./style.css";
import { Link } from "react-router-dom";

export const NotFound: FC = () => {
  return (
    <div className="container">
      <h1>404</h1>
      <p>Sorry, the page you are looking for does not exist.</p>
      <Link to="/">Go to Home</Link>
    </div>
  );
};
