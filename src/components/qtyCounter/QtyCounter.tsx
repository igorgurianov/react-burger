import { Counter } from "@ya.praktikum/react-developer-burger-ui-components";
import { FC } from "react";
import { useAppSelector } from "../../hooks";
import { TIngridientTypes } from "../../services/types/data";

type TProps = {
  id: string;
  type: string;
};

const QtyCounter: FC<TProps> = ({ id, type }) => {
  const { selectedFillings } = useAppSelector(
    (store) => store.burgerConstructor
  );
  const { selectedBun } = useAppSelector((store) => store.burgerConstructor);

  const countedNumber = () => {
    if (selectedBun && type === "bun") {
      return id === selectedBun._id ? 2 : 0;
    } else {
      return selectedFillings.reduce((count, ingredient) => {
        return ingredient._id === id ? count + 1 : count;
      }, 0);
    }
  };

  return <Counter count={countedNumber()} size="default" extraClass="m-1" />;
};

export default QtyCounter;
