import React from "react";
import {
  ConstructorElement,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./burger-component.module.css";
import PropTypes from "prop-types";

const burgerComponentPropTypes = {
  text: PropTypes.string.isRequired,
  thumbnail: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
};

const BurgerComponent = (props) => {
  return (
    <li className={styles.wrapper}>
      <DragIcon type="primary" />
      <ConstructorElement
        isLocked={props.isLocked}
        text={props.data.name}
        price={props.data.price}
        thumbnail={props.data.image}
        onClick={props.updateConstructor}
      />
    </li>
  );
};

BurgerComponent.propTypes = burgerComponentPropTypes.isRequired;

export default BurgerComponent;
