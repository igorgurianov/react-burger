import { FC } from "react";
import styles from "./order-details.module.css";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import acceptIcon from "../../images/accept_icon.svg";
import { useAppSelector } from "../../hooks";

interface IOrderDetails {
  onClose: () => void;
}

const OrderDetails: FC<IOrderDetails> = ({ onClose }) => {
  const order = useAppSelector((store) => store.order);

  return (
    <div className={`${styles.container} pt-30 pb-30 pr-25 pl-25`}>
      <div className={styles.closeIcon} onClick={() => onClose()}>
        <CloseIcon type="primary" />
      </div>
      {order && (
        <>
          <p className={`${styles.orderNumber} text text_type_digits-large`}>
            {order.order}
          </p>
          <h3 className={`${styles.title} text text_type_main-small mt-8`}>
            идентификатор заказа
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

export default OrderDetails;
