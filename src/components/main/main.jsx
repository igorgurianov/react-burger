import React from "react";
import styles from "./main.module.css";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";

class Main extends React.Component {
  render() {
    return (
      <main className={styles.main}>
        <BurgerIngredients data={this.props.data}></BurgerIngredients>
        <BurgerConstructor></BurgerConstructor>
      </main>
    );
  }
}

export default Main;
