import PropTypes from "prop-types";
import styles from "./nav-link.module.css";

const NavLink = ({ className, icon, text }) => {
  return (
    <a href="#" className={`${className} ${styles.link} pt-4 pb-4 pl-5 pr-5 `}>
      {icon}
      <span className="text text_type_main-default">{text}</span>
    </a>
  );
};

NavLink.propTypes = {
  className: PropTypes.string.isRequired,
  icon: PropTypes.node.isRequired,
  text: PropTypes.string.isRequired,
};

export default NavLink;
