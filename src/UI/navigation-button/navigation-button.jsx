import PropTypes from "prop-types";
import styles from "./navigation-button.module.css";
import { NavLink } from "react-router-dom";

import { cloneElement } from "react";

const NavigationButton = ({ className, icon, text, to }) => {
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

NavigationButton.propTypes = {
  icon: PropTypes.node.isRequired,
  text: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired,
};

export default NavigationButton;
