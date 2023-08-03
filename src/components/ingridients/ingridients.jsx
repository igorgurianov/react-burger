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
import { useDispatch, useSelector } from "react-redux";
import { getItems } from "../../services/actions";
import { ADD_BUN, ADD_FILLING } from "../../services/actions/constructor";
import {
  GET_INGRIDIENT_DETAILS,
  REMOVE_INGRIDIENT_DETAILS,
} from "../../services/actions/details";

const Ingridients = () => {
  const dispatch = useDispatch();

  const [ingridientCardInfo, setState] = useState("");

  const { constructor, setConstructor, updateTotal } =
    useContext(ConstructorContext);

  const allIngridients = useSelector((store) => store.ingridients);
  const selectedIngridients = useSelector((store) => store.constructor);
  const ingridientInfo = useSelector((store) => store.details);

  // Пока клик заменили на добавление в конструктор вместо открытия карточки c инфой
  // const onOpen = (ingridient) => {
  //   setState(ingridient);
  // };

  const onOpen = (ingridient) => {
    // dispatch({ type: GET_INGRIDIENT_DETAILS, payload: ingridient });
  };

  const onClose = () => {
    dispatch({ type: REMOVE_INGRIDIENT_DETAILS, payload: {} });
  };

  const checkArray = (ingridient, type) => {
    return ingridient.type === type;
  };

  const filterArray = (type) => {
    return allIngridients.allItems.filter((ingridient) =>
      checkArray(ingridient, type)
    );
  };

  useEffect(() => {
    dispatch(getItems());
  }, [dispatch]);

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
      {ingridientInfo.state && (
        <Modal onClose={onClose}>
          <IngredientDetails
            ingridient={ingridientInfo.state}
            onClose={onClose}
          />
        </Modal>
      )}
    </div>
  );
};

export default Ingridients;
