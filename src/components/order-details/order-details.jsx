import React, { useContext, useEffect, useState } from "react";
import styles from "./order-details.module.css";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import acceptIcon from "../../images/accept_icon.svg";
import PropTypes from "prop-types";
import { placeOrder } from "../../utils/api";
import { ConstructorContext } from "../../context/ConstructorContex";

const OrderDetails = ({ onClose }) => {
  const [order, setOrder] = useState(null);

  // const { constructor } = useContext(ConstructorContext);

  // const requestData = () => {
  //   var request = [];
  //   constructor.fillings.map((item) => {
  //     request.push(item._id);
  //   });
  //   request.push(constructor.bun[0]._id);

  //   return request;
  // };

  // console.log(requestData());

  const testData = [
    "643d69a5c3f7b9001cfa0943",
    "643d69a5c3f7b9001cfa0945",
    "643d69a5c3f7b9001cfa0944",
  ];

  // const getOrder = () => {

  // };

  useEffect(() => {
    placeOrder(testData).then((res) => setOrder(res));
    setOrder(null);
  }, []);

  return (
    <div className={`${styles.container} pt-30 pb-30 pr-25 pl-25`}>
      <div className={styles.closeIcon} onClick={() => onClose()}>
        <CloseIcon />
      </div>
      {order && (
        <>
          <p className={`${styles.orderNumber} text text_type_digits-large`}>
            {order.order.number}
          </p>
          <h3 className={`${styles.title} text text_type_main-small mt-8`}>
            {order.name}
          </h3>
        </>
      )}

      <img className="mt-15 mb-15" src={acceptIcon} alt="Заказ принят" />
      <p className="text text_type_main-small">Ваш заказ начали готовить</p>
      <p className="text text_type_main-small text_color_inactive mt-2">
        Дождитесь готовности на орбитальной станции
      </p>
    </div>
  );
};

OrderDetails.propTypes = {
  onClose: PropTypes.func.isRequired,
};

export default OrderDetails;
