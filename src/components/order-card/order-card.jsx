import tempImg from "../../assets/ingredients.png";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import style from "./order-card.module.css";

const OrderCard = () => {
  return (
    <div className={`${style.container} p-6 mr-2`}>
      <div className={style.twoColumnsLayout}>
        <span className={`${style.orderNumber} text text_type_digits-default`}>
          #034535
        </span>
        <span className="text text_type_main-default text_color_inactive">
          Сегодня, 16:20 i-GMT+3
        </span>
      </div>

      <p className="text text_type_main-medium mt-6">
        Death Star Starship Main бургер
      </p>
      <span className="text text_type_main-default mt-2">Создан</span>
      <div className={`${style.twoColumnsLayout} mt-6`}>
        <img className="" src={tempImg} alt="" />
        <div className={style.price}>
          <span className="text text_type_digits-default">480</span>
          <CurrencyIcon type="primary" />
        </div>
      </div>
    </div>
  );
};

export default OrderCard;
