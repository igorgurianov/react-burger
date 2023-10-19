import { useParams } from "react-router-dom";
import styles from "./order-info.module.css";
import {
  CurrencyIcon,
  FormattedDate,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useEffect } from "react";
import { getOrderInfo } from "../../services/actions/order-details";
import { useDispatch, useSelector } from "react-redux";
import { useInfo } from "../../hooks/useInfo";
import TimeStamp from "../../components/time-stamp/TimeStamp";
import { useAppSelector, useAppDispatch } from "../../hooks";
import { any } from "prop-types";

const OrderInfo = ({ style }: any) => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { order, success, isLoading } = useAppSelector(
    (store) => store.orderDetails
  );
  const {
    findImgUrl,
    findIngredientName,
    countIngredients,
    findIngredientPrice,
  } = useInfo();

  useEffect(() => {
    //dispatch(getOrderInfo(id));
  }, [id, dispatch]);

  if (isLoading) {
    return (
      <div
        className={styles.container}
        style={
          style === "page"
            ? { backgroundColor: "transparent", marginTop: "80px" }
            : { backgroundColor: "#1C1C21" }
        }
      >
        <div className={styles.content}>
          <h4 className={`${styles.centered} text text_type_digits-default`}>
            #{id}
          </h4>
          <p className={`mt-10 text text_type_main-medium`}>Загрузка ...</p>
        </div>
      </div>
    );
  }

  if (!success) {
    return (
      <div
        className={styles.container}
        style={
          style === "page"
            ? { backgroundColor: "transparent", marginTop: "80px" }
            : { backgroundColor: "#1C1C21" }
        }
      >
        <div className={styles.content}>
          <h4 className={`${styles.centered} text text_type_digits-default`}>
            #{id}
          </h4>
          <p className={`mt-10 text text_type_main-medium`}>
            Не удалось загрузить данные
          </p>
        </div>
      </div>
    );
  }

  if (order && success) {
    return (
      <div
        className={styles.container}
        style={
          style === "page"
            ? { backgroundColor: "transparent", marginTop: "80px" }
            : { backgroundColor: "#1C1C21" }
        }
      >
        <div className={styles.content}>
          <h4 className={`${styles.centered} text text_type_digits-default`}>
            #{id}
          </h4>
          <p className={`mt-10 text text_type_main-medium`}>
            {order.name.length > 73
              ? `${order.name.substring(0, 70)}...`
              : order.name}
          </p>
          {order.status === "done" ? (
            <span
              className={`${styles.status} text text_type_main-default mt-3`}
            >
              Выполнен
            </span>
          ) : (
            <span
              className={`${styles.pending} text text_type_main-default mt-3`}
            >
              Готовится
            </span>
          )}

          <h3 className="mt-15 text text_type_main-medium">Состав:</h3>
          <ul className={`${styles.list} mt-6 custom-scroll`}>
            {order.ingredients &&
              countIngredients(order.ingredients).map(
                (ingredient: any, index: any) => {
                  return (
                    <div className={styles.ingredient} key={index}>
                      <img
                        src={findImgUrl(ingredient._id)}
                        alt=""
                        className={styles.img}
                      />
                      <p
                        className={`${styles.ingredientName} text text_type_main-default`}
                      >
                        {findIngredientName(ingredient._id)}
                      </p>
                      <div className={styles.price}>
                        <span className="text text_type_digits-default">
                          {ingredient.count} x{" "}
                          {findIngredientPrice(ingredient._id)}
                        </span>
                        <CurrencyIcon type="primary" />
                      </div>
                    </div>
                  );
                }
              )}
          </ul>
          <div className={`${styles.info} mt-10`}>
            <TimeStamp dateFromServer={order.createdAt} />
            <div className={styles.total}>
              <span className="text text_type_digits-default mr-2">
                {countIngredients(order.ingredients).reduce(
                  (acc: any, item: any) => {
                    return acc + item.price * item.count;
                  },
                  0
                )}
              </span>
              <CurrencyIcon type="primary" />
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default OrderInfo;
