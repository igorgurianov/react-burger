import style from "./status-tableau.module.css";
import { useSelector } from "react-redux";

const StatusTableau = () => {
  const { orders, total, totalToday } = useSelector(
    (store) => store.orderFeed.orders
  );

  return (
    <div>
      <div className={style.boards}>
        <div className={style.board}>
          <h4 className="text text_type_main-medium">Готовы:</h4>
          {orders && (
            <ul className={style.board__list}>
              {orders.slice(0, 6).map((order) => {
                if (order.status === "done") {
                  return (
                    <li
                      className={`${style.number_ready} text text_type_digits-default`}
                      key={order.number}
                    >
                      {order.number}
                    </li>
                  );
                }
              })}
            </ul>
          )}
        </div>
        <div className={style.board}>
          <h4 className="text text_type_main-medium">В работе:</h4>
          {orders && (
            <ul className={style.board__list}>
              {orders.map((order) => {
                if (order.status === "pending") {
                  return (
                    <li className="text text_type_digits-default">
                      {order.number}
                    </li>
                  );
                }
              })}
            </ul>
          )}
        </div>
      </div>
      <div className="mt-15">
        <h4 className="text text_type_main-medium">Выполнено за все время:</h4>
        <span className={`${style.glow} text text_type_digits-large`}>
          {total}
        </span>
      </div>
      <div className="mt-15">
        <h4 className="text text_type_main-medium">Выполнено за сегодня:</h4>
        <span className={`${style.glow} text text_type_digits-large`}>
          {totalToday}
        </span>
      </div>
    </div>
  );
};

export default StatusTableau;
