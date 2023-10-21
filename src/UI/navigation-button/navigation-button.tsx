import styles from "./navigation-button.module.css";
import { NavLink } from "react-router-dom";
import { ReactElement, cloneElement } from "react";

interface INavigationButton {
  className?: string;
  icon: ReactElement;
  text: string;
  to: string;
}

const NavigationButton = ({ className, icon, text, to }: INavigationButton) => {
  return (
    <NavLink
      className={({ isActive }) =>
        `${
          styles.link
        } ${className} pt-4 pb-4 pl-5 pr-5 text text_type_main-default
        ${isActive ? styles.active : ""}`
      }
      to={to}
    >
      {({ isActive }) => (
        <div className={`${styles.tab}`}>
          {cloneElement(icon, {
            type: isActive ? "primary" : "secondary",
          })}
          {text}
        </div>
      )}
    </NavLink>
  );
};

export default NavigationButton;
