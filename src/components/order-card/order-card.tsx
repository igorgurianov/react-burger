import { FC } from "react";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import style from "./order-card.module.css";
import { Link, useLocation } from "react-router-dom";
import TimeStamp from "../time-stamp/TimeStamp";
import { useInfo } from "../../hooks/useInfo";
import { TOrder } from "../../services/types/data";

const OrderCard: FC<TOrder> = ({
  name,
  number,
  createdAt,
  ingredients,
  status,
  path,
}) => {
  const location = useLocation();
  const { findImgUrl, orderPrice } = useInfo();

  return (
    <Link
      to={`/${path}/${number}`}
      className={style.link}
      state={{ background: location }}
    >
      <div className={`${style.container} p-6 mr-2`}>
        <div className={style.twoColumnsLayout}>
          <span
            className={`${style.orderNumber} text text_type_digits-default`}
          >
            #{number}
          </span>
          <TimeStamp dateFromServer={createdAt} />
        </div>

        <p className="text text_type_main-medium mt-6">
          {name.length > 73 ? `${name.substring(0, 70)}...` : name}
        </p>

        {status === "done" ? (
          <span className={`${style.done} text text_type_main-default mt-2`}>
            Выполнен
          </span>
        ) : status === "pending" ? (
          <span className={`${style.pending} text text_type_main-default mt-2`}>
            Готовится
          </span>
        ) : (
          <span className={`${style.loading} text text_type_main-default mt-2`}>
            Готовится
          </span>
        )}

        <div className={`${style.twoColumnsLayout} mt-6`}>
          <div className={style.ingredients}>
            {ingredients.slice(0, 5).map((i, index) => {
              if (i) {
                return (
                  <div className={style.imgOverlay} key={index}>
                    <img
                      src={findImgUrl(i)}
                      className={style.img}
                      key={index}
                    />
                  </div>
                );
              }
            })}
            {ingredients.length > 5 ? (
              <div className={style.overrun}>
                <img
                  src={findImgUrl(ingredients[5])}
                  className={style.overrunImg}
                />
                <span
                  className={`${style.overrunNumber} text text_type_main-default`}
                >
                  +{ingredients.length - 5}
                </span>
                <div className={style.overrunOverlay}></div>
              </div>
            ) : (
              ""
            )}
          </div>
          <div className={style.price}>
            <span className="text text_type_digits-default">
              {orderPrice(ingredients)}
            </span>
            <CurrencyIcon type="primary" />
          </div>
        </div>
      </div>
    </Link>
  );
};

export default OrderCard;
