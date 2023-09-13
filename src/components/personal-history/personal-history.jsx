import { useEffect } from "react";
import OrderHistory from "../order-history/order-history";
import {
  WS_HISTORY_START,
  WS_HISTORY_CLOSED,
} from "../../services/actions/order-history";
import { ORDER_HISTORY_URL } from "../../utils/api";
import { useDispatch, useSelector } from "react-redux";

const PersonalHistory = () => {
  const dispatch = useDispatch();
  const { orders } = useSelector((store) => store.orderHistory.orders);
  const { isConnecting } = useSelector((store) => store.orderHistory);
  const token = localStorage.getItem("accessToken").substring(7);

  useEffect(() => {
    dispatch({
      type: WS_HISTORY_START,
      payload: `${ORDER_HISTORY_URL}?token=${token}`,
    });

    return () => dispatch({ type: WS_HISTORY_CLOSED });
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
