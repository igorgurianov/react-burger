import { useParams } from "react-router-dom";
import styles from "./order-info.module.css";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { FC, useEffect } from "react";
import { getOrderInfo } from "../../services/actions/order-details";
import { TCountedIngredient, useInfo } from "../../hooks/useInfo";
import TimeStamp from "../../components/time-stamp/TimeStamp";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { TIngredient } from "../../services/types/data";

type Props = {
  style: string;
  onClose?: () => void;
};

const OrderInfo: FC<Props> = ({ style }) => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const { success, isLoading } = useAppSelector((store) => store.orderDetails);
  const { order } = useAppSelector((store) => store.orderDetails);

  const {
    findImgUrl,
    findIngredientName,
    countIngredients,
    findIngredientPrice,
  } = useInfo();

  useEffect(() => {
    if (id) {
      dispatch(getOrderInfo(id));
    }
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

  if (success && order) {
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
                (ingredient: TCountedIngredient, index: number) => {
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
                  (acc: number, item: TCountedIngredient) => {
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
  } else {
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
};

export default OrderInfo;
