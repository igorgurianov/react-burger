import React from "react";
import NavLink from '../nav-link/nav-link';
import { Logo } from '@ya.praktikum/react-developer-burger-ui-components';
import {ListIcon, BurgerIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './nav-panel.module.css';


class NavPanel extends React.Component {
    render () {
return (
  <nav className={styles.navBar}>
    <ul className={styles.navList}>
        <li >
          <NavLink className={`${styles.navLink} pt-4 pb-4 pl-5 pr-5`} text='Конструктор' icon={<BurgerIcon type="primary"/>}/>
        </li>
        <li>
          <NavLink className={`${styles.navLink} pt-4 pb-4 pl-5 pr-5`} text='Лента заказов' icon={<ListIcon type="secondary"/>}/>
        </li>
      </ul>
      <div className={styles.logo}> <Logo className={styles.logoSVG}/></div>
      <NavLink className={`${styles.navLink} ${styles.login} pt-4 pb-4 pl-5 pr-5`} text='Личный кабинет' icon={<ProfileIcon type="secondary"/>}/>
    </nav>
)
}}

export default NavPanel;
