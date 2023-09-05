import styles from "./orders.module.css";
import OrderHistory from "../../components/order-history/order-history";
import StatusTableau from "../../components/status-tableau/status-tableau";

const Orders = () => {
  return (
    <div className={styles.container}>
      <h3 className="text text_type_main-large">Лента заказов</h3>
      <div className={styles.content}>
        <OrderHistory />
        <StatusTableau />
      </div>
      <div></div>
    </div>
  );
};
export default Orders;
