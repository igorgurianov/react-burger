import React, { useState, useContext, useEffect, useCallback } from "react";
import {
  CurrencyIcon,
  Button,
  ConstructorElement,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./burger-constructor.module.css";
import BurgerComponent from "../burger-component/burger-component.jsx";
import Total from "../total/total";
import ingridientTypes from "../../utils/constants";
import Modal from "../modal/modal";

import OrderDetails from "../order-details/order-details";
import { useDispatch, useSelector } from "react-redux";
import { getOrder } from "../../services/actions/order";
import { CLOSE_ORDER_INFO } from "../../services/actions/order";
import { DndProvider, useDrop } from "react-dnd";
import {
  ADD_BUN,
  ADD_FILLING,
  ORDER_INGRIDIENTS,
} from "../../services/actions/constructor";
import { v4 as uuidv4 } from "uuid";
import { HTML5Backend } from "react-dnd-html5-backend";

const BurgerConstructor = () => {
  const dispatch = useDispatch();
  // Стор конструктора
  const { selectedBun, selectedFillings } = useSelector(
    (store) => store.burgerConstructor
  );
  // Стор заказа
  const { isOpen, order } = useSelector((store) => store.order);

  // Перенос начального ингридиента в конструктор
  const [{ isHover }, dropTarget] = useDrop({
    accept: "ingridient",
    collect: (monitor) => ({
      isHover: monitor.isOver(),
    }),
    drop(ingridient) {
      onDropHandler(ingridient.data);
    },
  });

  // Хендлер переноса начального ингридиента в конструктор
  const onDropHandler = (ingridient) => {
    const uniqueId = uuidv4();
    if (ingridient.type === ingridientTypes.bun) {
      dispatch({ type: ADD_BUN, payload: { ...ingridient, uniqueId } });
    } else {
      dispatch({ type: ADD_FILLING, payload: { ...ingridient, uniqueId } });
    }
  };

  const borderColor = isHover ? { border: "2px solid greenyellow" } : {};

  // Окно с номером заказа
  const onOpen = () => {
    dispatch(getOrder(requestData()));
  };
  const onClose = () => {
    dispatch({ type: CLOSE_ORDER_INFO, payload: {} });
  };

  const requestData = () => {
    var request = [];
    selectedFillings.map((item) => {
      request.push(item._id);
    });
    request.push(selectedBun._id);

    return request;
  };

  // Передвижение внутри констуктора
  const moveCard = (dragIndex, hoverIndex) => {
    dispatch({ type: ORDER_INGRIDIENTS, payload: { dragIndex, hoverIndex } });
  };

  return (
    <div
      ref={dropTarget}
      className={`${styles.constructor}`}
      style={borderColor}
    >
      <div className={`${styles.elements} mt-25`}>
        {selectedBun && (
          <ConstructorElement
            extraClass="mr-2 ml-4"
            type="top"
            isLocked
            text={`${selectedBun.name} (верх)`}
            price={selectedBun.price}
            thumbnail={selectedBun.image}
          />
        )}

        {selectedFillings && (
          <DndProvider backend={HTML5Backend}>
            <ul className={`${styles.list} custom-scroll pr-2`}>
              {selectedFillings.map((ingridient, index) => {
                return (
                  <BurgerComponent
                    key={ingridient.uniqueId}
                    data={ingridient}
                    uniqueId={ingridient.uniqueId}
                    index={index}
                    moveCard={moveCard}
                  />
                );
              })}
            </ul>
          </DndProvider>
        )}

        {selectedBun && (
          <ConstructorElement
            extraClass="mr-2 ml-4"
            type="bottom"
            isLocked
            text={`${selectedBun.name} (низ)`}
            price={selectedBun.price}
            thumbnail={selectedBun.image}
          />
        )}
      </div>

      <div className={`${styles.info} mt-10 pr-4`}>
        <Total />
        <CurrencyIcon type="primary" />
        <Button
          onClick={onOpen}
          htmlType="button"
          type="primary"
          size="large"
          style={{ marginLeft: "40px" }}
        >
          Оформить заказ
        </Button>
      </div>
      {isOpen && (
        <Modal onClose={onClose}>
          <OrderDetails onClose={onClose} />
        </Modal>
      )}
    </div>
  );
};

export default BurgerConstructor;
