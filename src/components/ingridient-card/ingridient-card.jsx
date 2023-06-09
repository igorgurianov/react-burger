import React from "react";
import {
  Counter,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./ingridient-card.module.css";
import burgerIngridientsPropTypes from "../../utils/prop-types";
import PropTypes from "prop-types";

const IngredientCard = ({ data, onOpen }) => {
  return (
    <div className={styles.ingridientCard} onClick={() => onOpen(data)}>
      <img className="ml-4 mr-4" src={data.image} alt="" />
      <Counter count={1} size="default" extraClass="m-1" />
      <div className={`${styles.price} mt-1 mb-1`}>
        <p className="text text_type_digits-default">{data.price}</p>
        <CurrencyIcon type="primary" />
      </div>
      <p className={`${styles.name} text text_type_main-default`}>
        {data.name}
      </p>
    </div>
  );
};

IngredientCard.propTypes = {
  data: burgerIngridientsPropTypes,
  onOpen: PropTypes.func.isRequired,
};

export default IngredientCard;
