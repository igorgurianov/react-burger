import OrderCard from "../order-card/order-card";
import styles from "./order-history.module.css";

const OrderHistory = () => {
  return (
    <div className={`${styles.container} custom-scroll`}>
      <OrderCard />
      <OrderCard />
      <OrderCard />
      <OrderCard />
      <OrderCard />
    </div>
  );
};

export default OrderHistory;
