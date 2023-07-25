import React, { useContext, useEffect, useState } from "react";
import IngredientCard from "../ingridient-card/ingridient-card";
import styles from "./ingridients.module.css";
import PropTypes from "prop-types";
import burgerIngridientsPropTypes from "../../utils/prop-types";
import ingridientTypes from "../../utils/constants";
import Modal from "../modal/modal";
import IngredientDetails from "../ingredient-details/ingredient-details";
import { IngridientsContex } from "../../context/IngridientsContext";
import { ConstructorContext } from "../../context/ConstructorContex";

const Ingridients = () => {
  const [ingridientCardInfo, setState] = useState("");

  const { ingridients, setIngridients } = useContext(IngridientsContex);
  const { constructor, setConstructor, updateTotal } =
    useContext(ConstructorContext);

  // Пока клик заменили на добавление в конструктор вместо открытия карточки с инфой
  // const onOpen = (ingridient) => {
  //   setState(ingridient);
  // };

  const onOpen = (ingridient) => {
    if (ingridient.type === ingridientTypes.bun) {
      setConstructor({
        ...constructor,
        bun: [ingridient],
      });
    } else {
      setConstructor({
        ...constructor,
        fillings: [...constructor.fillings, ingridient],
      });
    }
    updateTotal(ingridient);
  };

  const onClose = () => {
    setState("");
  };

  const checkArray = (ingridient, type) => {
    return ingridient.type === type;
  };

  const filterArray = (type) => {
    return ingridients.filter((ingridient) => checkArray(ingridient, type));
  };

  return (
    <div className={`${styles.wrapper} custom-scroll mt-10`}>
      <h2 className="text text_type_main-medium">Булки</h2>
      <div className={`${styles.container} pt-6 pl-4 pr-4 pb-10`}>
        {filterArray(ingridientTypes.bun).map((ingridient, index) => (
          <IngredientCard key={index} data={ingridient} onOpen={onOpen} />
        ))}
      </div>
      <h2 className="text text_type_main-medium">Соусы</h2>
      <div className={`${styles.container} pt-6 pl-4 pr-4 pb-10`}>
        {filterArray(ingridientTypes.sauce).map(
          (ingridient, index) =>
            ingridient.type === ingridientTypes.sauce && (
              <IngredientCard key={index} data={ingridient} onOpen={onOpen} />
            )
        )}
      </div>
      <h2 className="text text_type_main-medium">Начинки</h2>
      <div className={`${styles.container} pt-6 pl-4 pr-4 pb-10`}>
        {filterArray(ingridientTypes.main).map((ingridient, index) => (
          <IngredientCard key={index} data={ingridient} onOpen={onOpen} />
        ))}
      </div>
      {ingridientCardInfo && (
        <Modal onClose={onClose}>
          <IngredientDetails
            ingridient={ingridientCardInfo}
            onClose={onClose}
          />
        </Modal>
      )}
    </div>
  );
};

// Ingridients.propTypes = {
//   data: PropTypes.arrayOf(burgerIngridientsPropTypes).isRequired,
// };

export default Ingridients;
