import { useDispatch } from "react-redux";
import { ProfileButton } from "../UI/profile-button/profile-button";
import { Outlet } from "react-router-dom";
import { logout } from "../services/actions/user";

export const Profile = () => {
  const dispatch = useDispatch();
  const handleLogoutClick = () => {
    dispatch(logout());
  };

  return (
    <div
      style={{
        display: "flex",
        maxWidth: "1280px",
        margin: "120px auto 0 auto",
        gap: "60px",
      }}
    >
      <div>
        <nav>
          <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
            <li>
              <ProfileButton to={"/profile"}>Профиль</ProfileButton>
            </li>
            <li>
              <ProfileButton to={"/profile/orders"}>
                История заказов
              </ProfileButton>
            </li>
            <li>
              <ProfileButton
                // to={"/"}
                onClick={handleLogoutClick}
              >
                Выход
              </ProfileButton>
            </li>
          </ul>
        </nav>
      </div>
      <Outlet />
    </div>
  );
};
