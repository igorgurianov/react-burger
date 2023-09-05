import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

const Protected = ({ onlyUnAuth = false, component }) => {
  const user = useSelector((store) => store.user.user);
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

  return component;
};

export const OnlyAuth = Protected;
export const OnlyUnAuth = ({ component }) => (
  <Protected onlyUnAuth={true} component={component} />
);
