import styles from "../header/header.module.css";
import { Logo } from "@ya.praktikum/react-developer-burger-ui-components";
import {
  ListIcon,
  BurgerIcon,
  ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import NavigationButton from "../../UI/navigation-button/navigation-button";

const AppHeader = () => {
  return (
    <header className={`${styles.header} pt-4 pb-4`}>
      <nav className={`${styles.navBar} mt-4`}>
        <ul className={styles.navList}>
          <li>
            <NavigationButton
              text="Конструктор"
              icon={<BurgerIcon />}
              to={"/"}
            />
          </li>
          <li>
            <NavigationButton
              text="Лента заказов"
              icon={<ListIcon />}
              to={"/feed"}
            />
          </li>
        </ul>
        <div className={styles.logo}>
          <Logo className={styles.logoSVG} />
        </div>
        <NavigationButton
          className={` ${styles.login}`}
          text="Личный кабинет"
          icon={<ProfileIcon />}
          to={"/profile"}
        />
      </nav>
    </header>
  );
};

export default AppHeader;
