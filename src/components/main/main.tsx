import styles from "./main.module.css";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";

const Main = () => {
  return (
    <main className={`${styles.main} pb-10`}>
      <BurgerIngredients />
      <BurgerConstructor />
    </main>
  );
};

export default Main;
