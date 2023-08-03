import React from "react";
import {
  Counter,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./ingridient-card.module.css";
import burgerIngridientsPropTypes from "../../utils/prop-types";
import PropTypes from "prop-types";
import { useDrag } from "react-dnd";

const IngredientCard = ({ data, onOpen }) => {
  const { image, price, name, _id } = data;

  const [{ isDrag }, dragRef] = useDrag({
    type: "ingridient",
    item: { data },
    collect: (monitor) => ({
      isDrag: monitor.isDragging(),
    }),
  });

  return (
    !isDrag && (
      <div
        ref={dragRef}
        className={styles.ingridientCard}
        onClick={() => onOpen(data)}
      >
        <img className="ml-4 mr-4" src={image} alt="" />
        <Counter count={1} size="default" extraClass="m-1" />
        <div className={`${styles.price} mt-1 mb-1`}>
          <p className="text text_type_digits-default">{price}</p>
          <CurrencyIcon type="primary" />
        </div>
        <p className={`${styles.name} text text_type_main-default`}>{name}</p>
      </div>
    )
  );
};

IngredientCard.propTypes = {
  data: burgerIngridientsPropTypes,
  onOpen: PropTypes.func.isRequired,
};

export default IngredientCard;
