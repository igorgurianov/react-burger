import {
  Counter,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useSelector } from "react-redux";
import ingridientTypes from "../../utils/constants";

const QtyCounter = ({ id, type }) => {
  const { selectedFillings } = useSelector((store) => store.burgerConstructor);
  const { selectedBun } = useSelector((store) => store.burgerConstructor);

  const countedNumber = () => {
    if (selectedBun && type === ingridientTypes.bun) {
      return id === selectedBun._id ? 1 : 0;
    } else {
      return selectedFillings.reduce((count, ingredient) => {
        return ingredient._id === id ? count + 1 : count;
      }, 0);
    }
  };

  return <Counter count={countedNumber()} size="default" extraClass="m-1" />;
};

export default QtyCounter;
