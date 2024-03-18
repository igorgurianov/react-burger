import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./ingridient-card.module.css";
import { useDrag } from "react-dnd";
import QtyCounter from "../qtyCounter/QtyCounter";
import { Link, useLocation } from "react-router-dom";
import { TIngredient } from "../../services/types/data";
import { TOnOpenFunction } from "../../services/types/data";
import { FC } from "react";

const IngredientCard: FC<{ data: TIngredient; onOpen: TOnOpenFunction }> = ({
  data,
  onOpen,
}) => {
  const location = useLocation();

  const { image, price, name, _id, type } = data;

  const [, dragRef] = useDrag({
    type: "ingridient",
    item: { data },
  });

  return (
    <Link
      to={`/ingredients/${_id}`}
      state={{ background: location }}
      className={styles.link}
    >
      <div
        ref={dragRef}
        className={styles.ingridientCard}
        onClick={() => onOpen(data)}
      >
        <img className="ml-4 mr-4" src={image} alt="" />
        <QtyCounter id={_id} type={type} />
        <div className={`${styles.price} mt-1 mb-1`}>
          <p className="text text_type_digits-default">{price}</p>
          <CurrencyIcon type="primary" />
        </div>
        <p className={`${styles.name} text text_type_main-default`}>{name}</p>
      </div>
    </Link>
  );
};

export default IngredientCard;
