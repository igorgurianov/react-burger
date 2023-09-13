import styles from "./orders.module.css";
import OrderHistory from "../../components/order-history/order-history";
import StatusTableau from "../../components/status-tableau/status-tableau";

import { ORDER_FEED_URL } from "../../utils/api";

import {
  WS_CONNECTION_START,
  WS_CONNECTION_CLOSED,
} from "../../services/actions/order-feed";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

const Feed = () => {
  const dispatch = useDispatch();
  const { orders } = useSelector((store) => store.orderFeed.orders);
  const { isConnecting } = useSelector((store) => store.orderFeed);

  useEffect(() => {
    dispatch({ type: WS_CONNECTION_START, payload: ORDER_FEED_URL });

    return () => dispatch({ type: WS_CONNECTION_CLOSED });
  }, [dispatch]);

  if (isConnecting) {
    return (
      <div className={styles.container}>
        <h3 className="text text_type_main-large">Лента заказов</h3>
        <p className="text text_type_main-medium mt-6">Загрузка ...</p>
      </div>
    );
  }

  if (orders && !isConnecting) {
    return (
      <div className={styles.container}>
        <h3 className="text text_type_main-large">Лента заказов</h3>
        <div className={styles.content}>
          <OrderHistory orders={orders} path="feed" />
          <StatusTableau />
        </div>
      </div>
    );
  }
};
export default Feed;
