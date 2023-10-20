import { FC, ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAppSelector } from "../../hooks";

type Props = {
  onlyUnAuth?: boolean;
  component: ReactNode;
};

const Protected: FC<Props> = ({ onlyUnAuth = false, component }) => {
  const user = useAppSelector((store) => store.user.user);
  const location = useLocation();

  if (onlyUnAuth && user) {
    //Роут только для неавторизованных, но пользователь авторизован
    //
    const { from } = location.state || { from: { pathname: "/" } };
    return <Navigate to={from} />;
  }

  if (!onlyUnAuth && !user) {
    //Роут для авторизованных, но пользователь не авторизован
    //Перенаправляем на страницу логина
    return <Navigate to="/login" state={{ from: location }} />;
  }

  return <>{component}</>;
};

export const OnlyAuth = Protected;
export const OnlyUnAuth = ({ component }: Props) => (
  <Protected onlyUnAuth={true} component={component} />
);
