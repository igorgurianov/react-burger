import React from "react";
import styles from "./main.module.css";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import burgerIngridientsPropTypes from "../../utils/prop-types";
import PropTypes from "prop-types";

class Main extends React.Component {
  render() {
    return (
      <main className={styles.main}>
        <BurgerIngredients data={this.props.data} />
        <BurgerConstructor data={this.props.data} />
      </main>
    );
  }
}

Main.propTypes = {
  data: PropTypes.arrayOf(burgerIngridientsPropTypes).isRequired,
};

export default Main;
