import styles from "./orders.module.css";
import OrderHistory from "../../components/order-history/order-history";
import StatusTableau from "../../components/status-tableau/status-tableau";

import { ORDER_FEED_URL } from "../../utils/api";
import {
  wsFeedConnect,
  wsFeedDisconnect,
} from "../../services/actions/order-feed";

import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks";

const Feed = () => {
  const dispatch = useAppDispatch();
  const { orders } = useAppSelector((store) => store.orderFeed.orders);
  const { isConnecting } = useAppSelector((store) => store.orderFeed);

  useEffect(() => {
    dispatch(wsFeedConnect(ORDER_FEED_URL));

    return () => {
      dispatch(wsFeedDisconnect());
    };
  }, [dispatch]);

  if (isConnecting && !orders) {
    return (
      <div className={styles.container}>
        <h3 className="text text_type_main-large">Лента заказов</h3>
        <p className="text text_type_main-medium mt-6">Загрузка ...</p>
      </div>
    );
  } else {
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
