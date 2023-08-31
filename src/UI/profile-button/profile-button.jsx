import { NavLink } from "react-router-dom";
import styles from "./profile-button.module.css";
import { useLocation } from "react-router-dom";

export const ProfileButton = ({ children, to, onClick }) => {
  const location = useLocation();
  const isActive = location.pathname === to;

  if (to) {
    return (
      <NavLink
        to={to}
        className={`${styles.link} text text_type_main-medium
      `}
        style={isActive ? { color: "#F2F2F3" } : { color: "#8585AD" }}
      >
        {children}
      </NavLink>
    );
  } else {
    return (
      <div
        className={`${styles.link} ${styles.logout} text text_type_main-medium
      `}
        style={isActive ? { color: "#F2F2F3" } : { color: "#8585AD" }}
        onClick={() => onClick()}
      >
        {children}
      </div>
    );
  }
};
