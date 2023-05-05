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

class BurgerComponent extends React.Component {
  render() {
    return (
      <li className={styles.wrapper}>
        <DragIcon type="primary" />
        <ConstructorElement
          type={this.props.type}
          isLocked={this.props.isLocked}
          text={this.props.text}
          price={this.props.price}
          thumbnail={this.props.thumbnail}
        />
      </li>
    );
  }
}

export default BurgerComponent;

BurgerComponent.propTypes = burgerComponentPropTypes;
