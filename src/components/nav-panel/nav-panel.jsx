import NavLink from "../nav-link/nav-link";
import { Logo } from "@ya.praktikum/react-developer-burger-ui-components";
import {
  ListIcon,
  BurgerIcon,
  ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./nav-panel.module.css";

const NavPanel = () => {
  return (
    <nav className={styles.navBar}>
      <ul className={styles.navList}>
        <li>
          <NavLink
            className={`${styles.navLink} `}
            text="Конструктор"
            icon={<BurgerIcon type="primary" />}
          />
        </li>
        <li>
          <NavLink
            className={`${styles.navLink} text_color_inactive`}
            text="Лента заказов"
            icon={<ListIcon type="secondary" />}
          />
        </li>
      </ul>
      <div className={styles.logo}>
        <Logo className={styles.logoSVG} />
      </div>
      <NavLink
        className={`${styles.navLink} ${styles.login} text_color_inactive`}
        text="Личный кабинет"
        icon={<ProfileIcon type="secondary" />}
      />
    </nav>
  );
};

export default NavPanel;
