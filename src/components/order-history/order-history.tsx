import { FC } from "react";
import OrderCard from "../order-card/order-card";
import styles from "./order-history.module.css";
import { TOrder } from "../../services/types/data";

interface IOrderHistory {
  orders: TOrder[];
  path: string;
}

const OrderHistory: FC<IOrderHistory> = ({ orders, path }) => {
  return (
    <>
      {orders && (
        <div className={`${styles.container} custom-scroll`}>
          {orders.map((card) => (
            <OrderCard {...card} key={card._id} path={path} />
          ))}
        </div>
      )}
    </>
  );
};

export default OrderHistory;
