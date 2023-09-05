import { useSelector } from "react-redux";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./total.module.css";

const Total = () => {
  const selectedFillings = useSelector(
    (store) => store.burgerConstructor.selectedFillings
  );
  const selectedBun = useSelector(
    (store) => store.burgerConstructor.selectedBun
  );

  const totalPrice = () => {
    return (
      selectedFillings.reduce((acc, item) => acc + item.price, 0) +
      (selectedBun ? selectedBun.price * 2 : 0)
    );
  };

  return (
    <div className={`${styles.container} mr-10`}>
      <p className="text text_type_digits-medium mr-3">{totalPrice()}</p>
      <CurrencyIcon type="primary" />
    </div>
  );
};

export default Total;
