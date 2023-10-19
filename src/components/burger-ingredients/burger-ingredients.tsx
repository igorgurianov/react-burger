import styles from "./burger-ingredients.module.css";
import Ingridients from "../ingridients/ingridients";
import { FC } from "react";

const BurgerIngredients: FC = () => {
  return (
    <div className={styles.container}>
      <h1 className={`${styles.title} mt-10 text text_type_main-large`}>
        Соберите бургер
      </h1>
      <Ingridients />
    </div>
  );
};

export default BurgerIngredients;
