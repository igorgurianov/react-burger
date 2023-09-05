import { useDispatch } from "react-redux";
import { ProfileButton } from "../../UI/profile-button/profile-button";
import { Outlet } from "react-router-dom";
import { logout } from "../../services/actions/user";
import styles from "./profile.module.css";

export const Profile = () => {
  const dispatch = useDispatch();

  const handleLogoutClick = () => {
    dispatch(logout());
  };

  return (
    <div className={styles.container}>
      <div>
        <nav>
          <ul className={styles.list}>
            <li>
              <ProfileButton to={"/profile"}>Профиль</ProfileButton>
            </li>
            <li>
              <ProfileButton to={"/profile/orders"}>
                История заказов
              </ProfileButton>
            </li>
            <li>
              <ProfileButton onClick={handleLogoutClick}>Выход</ProfileButton>
            </li>
          </ul>
        </nav>
      </div>
      <Outlet />
    </div>
  );
};
