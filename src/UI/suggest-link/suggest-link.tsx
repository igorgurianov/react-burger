import { Link } from "react-router-dom";
import styles from "./suggest-link.module.css";
import { FC } from "react";

type Props = {
  to: string;
  buttonText: string;
};

export const SuggestLink: FC<Props> = ({ to, buttonText }) => {
  return (
    <Link to={to} className={`${styles.link} text text_type_main-default`}>
      {buttonText}
    </Link>
  );
};
