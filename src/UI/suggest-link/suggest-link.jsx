import { Link } from "react-router-dom";
import styles from "./suggest-link.module.css";

export const SuggestLink = ({ to, buttonText }) => {
  return (
    <Link to={to} className={`${styles.link} text text_type_main-default`}>
      {buttonText}
    </Link>
  );
};
