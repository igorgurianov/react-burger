import React from "react";
import styles from "./burger-ingredients.module.css";
import Tabs from "../tabs/tabs";
import Ingridients from "../ingridients/ingridients";
import PropTypes from "prop-types";

const burgerIngridientsPropTypes = PropTypes.shape({
  _id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  type: PropTypes.oneOf(["bun", "main", "sauce"]),
  proteins: PropTypes.number.isRequired,
  fat: PropTypes.number.isRequired,
  carbohydrates: PropTypes.number.isRequired,
  calories: PropTypes.number.isRequired,
  price: PropTypes.number.isRequired,
  image: PropTypes.string.isRequired,
  image_mobile: PropTypes.string.isRequired,
  image_large: PropTypes.string.isRequired,
  __v: PropTypes.number.isRequired,
});

class BurgerIngredients extends React.Component {
  render() {
    return (
      <div className={styles.container}>
        <h1 className={`${styles.title} mt-10 text text_type_main-large`}>
          Соберите бургер
        </h1>
        <Tabs></Tabs>
        <Ingridients data={this.props.data}></Ingridients>
      </div>
    );
  }
}

export default BurgerIngredients;

BurgerIngredients.propTypes = {
  data: PropTypes.arrayOf(burgerIngridientsPropTypes).isRequired,
};
