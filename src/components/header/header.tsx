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
              icon={<BurgerIcon type="primary" />}
              to={"/"}
            />
          </li>
          <li>
            <NavigationButton
              text="Лента заказов"
              icon={<ListIcon type="primary" />}
              to={"/feed"}
            />
          </li>
        </ul>
        <div className={styles.logo}>
          <Logo />
        </div>
        <NavigationButton
          className={` ${styles.login}`}
          text="Личный кабинет"
          icon={<ProfileIcon type="primary" />}
          to={"/profile"}
        />
      </nav>
    </header>
  );
};

export default AppHeader;
