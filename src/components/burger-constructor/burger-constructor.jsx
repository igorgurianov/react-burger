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
import { ConstructorContext } from "../../context/ConstructorContex";
import { placeOrder } from "../../utils/api";
import OrderDetails from "../order-details/order-details";
import { useDispatch, useSelector } from "react-redux";
import { getOrder } from "../../services/actions/order";
import { CLOSE_ORDER_INFO } from "../../services/actions/order";
import { useDrop } from "react-dnd";
import { ADD_BUN, ADD_FILLING } from "../../services/actions/constructor";

const BurgerConstructor = () => {
  const [orderInfo, setOrderInfo] = useState(false);
  const { constructor, setConstructor, setOrder } =
    useContext(ConstructorContext);

  const dispatch = useDispatch();

  const { selectedBun, selectedFillings } = useSelector(
    (store) => store.constructor
  );

  const { isOpen, order } = useSelector((store) => store.order);

  const [{ isHover }, dropTarget] = useDrop({
    accept: "ingridient",
    drop(ingridient) {
      onDropHandler(ingridient.data);
    },
  });

  const onDropHandler = (ingridient) => {
    if (ingridient.type === ingridientTypes.bun) {
      dispatch({ type: ADD_BUN, payload: ingridient });
    } else {
      dispatch({ type: ADD_FILLING, payload: ingridient });
    }
  };

  // console.log(selectedFillings);

  const onOpen = () => {
    // setOrderInfo(true);
    // placeOrder(requestData()).then((res) => setOrder(res));

    dispatch(getOrder(requestData()));
  };

  const onClose = () => {
    // setOrderInfo(false);
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

  return (
    <div ref={dropTarget} className={styles.constructor}>
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
          <ul className={`${styles.list} custom-scroll pr-2`}>
            {selectedFillings.map((ingridient, index) => {
              return <BurgerComponent key={index} data={ingridient} />;
            })}
          </ul>
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
        <Total data={constructor}> </Total>
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
