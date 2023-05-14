import React, { useState } from "react";
import styles from "./main.module.css";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import burgerIngridientsPropTypes from "../../utils/prop-types";
import PropTypes from "prop-types";
import Modal from "../modal/modal";
import IngredientDetails from "../ingredient-details/ingredient-details";

const Main = ({ data }) => {
  return (
    <main className={styles.main}>
      <BurgerIngredients data={data} />
      <BurgerConstructor data={data} />
    </main>
  );
};

Main.propTypes = {
  data: PropTypes.arrayOf(burgerIngridientsPropTypes).isRequired,
};

export default Main;
