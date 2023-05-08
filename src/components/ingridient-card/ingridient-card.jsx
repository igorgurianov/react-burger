import React from "react";
import {
  Counter,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./ingridient-card.module.css";
import burgerIngridientsPropTypes from "../../utils/prop-types";
import PropTypes from "prop-types";

class IngredientCard extends React.Component {
  render() {
    return (
      <div className={styles.ingridientCard}>
        <img className="ml-4 mr-4" src={this.props.data.image} alt="" />
        <Counter count={1} size="default" extraClass="m-1" />
        <div className={`${styles.price} mt-1 mb-1`}>
          <p className="text text_type_digits-default">
            {this.props.data.price}
          </p>
          <CurrencyIcon type="primary" />
        </div>
        <p className={`${styles.name} text text_type_main-default`}>
          {this.props.data.name}
        </p>
      </div>
    );
  }
}

IngredientCard.propTypes = {
  data: burgerIngridientsPropTypes,
};

export default IngredientCard;
