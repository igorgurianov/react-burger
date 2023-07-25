import React, { useState, useContext, useEffect } from "react";
import {
  CurrencyIcon,
  Button,
  ConstructorElement,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./burger-constructor.module.css";
import BurgerComponent from "../burger-component/burger-component.jsx";
import Total from "../total/total";
import burgerIngridientsPropTypes from "../../utils/prop-types";
import PropTypes from "prop-types";
import ingridientTypes from "../../utils/constants";
import Modal from "../modal/modal";
import { ConstructorProvider } from "../../context/ConstructorContex";
import { ConstructorContext } from "../../context/ConstructorContex";
import { IngridientsContex } from "../../context/IngridientsContext";

import api from "../../utils/api";

import OrderDetails from "../order-details/order-details";

const BurgerConstructor = () => {
  const [orderInfo, setOrderInfo] = useState(false);
  const { constructor, setConstructor } = useContext(ConstructorContext);

  const onOpen = () => {
    setOrderInfo(true);
  };

  const onClose = () => {
    setOrderInfo(false);
  };

  // const findIngridient = () => {
  //   constructor.filter((ingridient) => {

  //   })
  // }

  return (
    <div>
      {constructor && (
        <div className={`${styles.elements} mt-25`}>
          {constructor.bun.length > 0 && (
            <ConstructorElement
              extraClass="mr-2 ml-4"
              type="top"
              isLocked
              text={`${constructor.bun[0].name} (верх)`}
              price={constructor.bun[0].price}
              thumbnail={constructor.bun[0].image}
            />
          )}

          <ul className={`${styles.list} custom-scroll pr-2`}>
            {constructor.fillings.map(
              (ingridient, index) =>
                ingridient.type != ingridientTypes.bun && (
                  <BurgerComponent key={index} data={ingridient} />
                )
            )}
          </ul>
          {constructor.bun.length > 0 && (
            <ConstructorElement
              extraClass="mr-2 ml-4"
              type="bottom"
              isLocked
              text={`${constructor.bun[0].name} (низ)`}
              price={constructor.bun[0].price}
              thumbnail={constructor.bun[0].image}
            />
          )}
        </div>
      )}

      <div className={`${styles.info} mt-10 pr-4`}>
        <div className={`${styles.price} mr-10`}>
          <Total data={constructor}> </Total>
          <CurrencyIcon type="primary" />
        </div>
        <Button onClick={onOpen} htmlType="button" type="primary" size="large">
          Оформить заказ
        </Button>
      </div>
      {orderInfo && (
        <Modal onClose={onClose}>
          <OrderDetails onClose={onClose} />
        </Modal>
      )}
    </div>
  );
};

// BurgerConstructor.propTypes = {
//   data: PropTypes.arrayOf(burgerIngridientsPropTypes).isRequired,
// };

export default BurgerConstructor;
