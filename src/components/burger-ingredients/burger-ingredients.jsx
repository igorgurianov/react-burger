import React from "react";
import styles from "./burger-ingredients.module.css";
import Tabs from "../tabs/tabs";
import Ingridients from "../ingridients/ingridients";
import PropTypes from "prop-types";
import burgerIngridientsPropTypes from "../../utils/prop-types";

class BurgerIngredients extends React.Component {
  render() {
    return (
      <div className={styles.container}>
        <h1 className={`${styles.title} mt-10 text text_type_main-large`}>
          Соберите бургер
        </h1>
        <Tabs />
        <Ingridients data={this.props.data} />
      </div>
    );
  }
}

export default BurgerIngredients;

BurgerIngredients.propTypes = {
  data: PropTypes.arrayOf(burgerIngridientsPropTypes).isRequired,
};
