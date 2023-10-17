import { useEffect } from "react";
import OrderHistory from "../order-history/order-history";
import {
  wsHistoryConnect,
  wsHistoryDisconnect,
} from "../../services/actions/order-history";
import { ORDER_HISTORY_URL } from "../../utils/api";
import { useDispatch, useSelector } from "react-redux";

const PersonalHistory = () => {
  const dispatch = useDispatch();
  const { orders } = useSelector((store) => store.orderHistory.orders);
  const { isConnecting } = useSelector((store) => store.orderHistory);
  const token = localStorage.getItem("accessToken").substring(7);

  useEffect(() => {
    dispatch(wsHistoryConnect(`${ORDER_HISTORY_URL}?token=${token}`));

    return () => dispatch(wsHistoryDisconnect());
  }, [dispatch]);

  if (isConnecting) {
    return <p>Загрузка ...</p>;
  }

  if (orders) {
    const reversedOrders = orders.slice().reverse();
    return (
      <div>
        <OrderHistory orders={reversedOrders} path="profile/orders" />
      </div>
    );
  }
};

export default PersonalHistory;
