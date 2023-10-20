import { FC, useEffect } from "react";
import OrderHistory from "../order-history/order-history";
import {
  WS_HISTORY_CONNECT,
  WS_HISTORY_DISCONNECT,
  WS_HISTORY_CLOSE,
  wsHistoryConnect,
  wsHistoryDisconnect,
} from "../../services/actions/order-history";
import { ORDER_HISTORY_URL } from "../../utils/api";
import { useDispatch, useSelector } from "react-redux";
import { useAppDispatch, useAppSelector } from "../../hooks";

const PersonalHistory: FC = () => {
  const dispatch = useAppDispatch();
  const { orders } = useAppSelector((store) => store.orderHistory.orders);
  const { isConnecting } = useAppSelector((store) => store.orderHistory);
  const accessToken = localStorage.getItem("accessToken");
  const token = accessToken ? accessToken.substring(7) : null;

  useEffect(() => {
    dispatch(wsHistoryConnect(`${ORDER_HISTORY_URL}?token=${token}`));

    return () => {
      dispatch(wsHistoryDisconnect());
    };
  }, [dispatch]);

  if (orders) {
    const reversedOrders = orders.slice().reverse();
    return (
      <div>
        <OrderHistory orders={reversedOrders} path="profile/orders" />
      </div>
    );
  } else {
    return <p>Загрузка ...</p>;
  }
};

export default PersonalHistory;
