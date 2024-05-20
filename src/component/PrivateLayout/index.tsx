import { FC, ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { RootState } from "../../redux/store";
import { useSelector } from "react-redux";
import { selectAuthedUser } from "../../redux/selector/user";

interface PrivateLayoutProps {
  children: ReactNode;
}

export const PrivateLayout: FC<PrivateLayoutProps> = ({ children }) => {
  const redirectUrl = window.location.href
    .toString()
    .split(window.location.host)[1];

  const loggedIn = useSelector((state: RootState) => selectAuthedUser(state));

  if (loggedIn) {
    return <>{children}</>;
  } else {
    return <Navigate to={`/login?redirectTo=${redirectUrl}`} />;
  }
};
