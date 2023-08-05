import React from "react";
import {Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from "./tab.module.css";

class Tabs extends React.Component {
  render () {
    return (
      <div className={`${styles.tabs} mt-5`}>
      <Tab value="one">
        Булки
      </Tab>
      <Tab value="two">
        Соусы
      </Tab>
      <Tab value="three">
        Начинки
      </Tab>
      </div>
    )
  }


}
export default Tabs;
