import {
  Button,
  ConstructorElement,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./burger-constructor.module.css";
import BurgerComponent from "../burger-component/burger-component";
import Total from "../total/total";
import Modal from "../modal/modal";
import OrderDetails from "../order-details/order-details";
import { getOrder } from "../../services/actions/order";
import { CLOSE_ORDER_INFO } from "../../services/actions/order";
import { useDrop } from "react-dnd";
import {
  ORDER_INGRIDIENTS,
  RESET_CONSTRUCTOR,
} from "../../services/actions/constructor";
import { useNavigate } from "react-router-dom";
import { addIngridient } from "../../services/actions/constructor";
import { useAppSelector, useAppDispatch } from "../../hooks";
import { TIngredient } from "../../services/types/data";
import { FC } from "react";

const BurgerConstructor: FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  // Стор конструктора

  const { selectedBun, selectedFillings } = useAppSelector(
    (store) => store.burgerConstructor
  );

  // Стор заказа
  const user = useAppSelector((store) => store.user.user);
  const { orderRequest, isOpen } = useAppSelector((store) => store.order);

  // Перенос начального ингридиента в конструктор
  const [{ isHover }, dropTarget] = useDrop({
    accept: "ingridient",
    collect: (monitor) => ({
      isHover: monitor.isOver(),
    }),
    drop(ingridient: any) {
      onDropHandler(ingridient.data);
    },
  });

  // Хендлер переноса начального ингридиента в конструктор
  const onDropHandler = (ingridient: TIngredient) => {
    dispatch(addIngridient(ingridient));
  };

  const borderColor = isHover ? { border: "2px solid greenyellow" } : {};

  // Окно с номером заказа
  const onOpen = () => {
    if (user) {
      if (selectedBun) {
        const constructor = [
          selectedBun._id,
          ...selectedFillings.map((item) => item._id),
          selectedBun._id,
        ];
        dispatch(getOrder(constructor));
      }
    } else {
      navigate("/login");
    }
  };

  const onClose = () => {
    dispatch({ type: CLOSE_ORDER_INFO });
    dispatch({ type: RESET_CONSTRUCTOR });
  };

  // Передвижение внутри констуктора
  const moveCard = (dragIndex: number, hoverIndex: number) => {
    dispatch({ type: ORDER_INGRIDIENTS, payload: { dragIndex, hoverIndex } });
  };

  return (
    <div
      ref={dropTarget}
      className={`${styles.constructor}`}
      style={borderColor}
    >
      <div className={`${styles.elements} mt-25`}>
        {selectedBun && (
          <ConstructorElement
            extraClass="mr-2 ml-4"
            type="top"
            isLocked
            text={`${selectedBun.name} (верх)`}
            price={selectedBun.price}
            thumbnail={selectedBun.image}
          />
        )}

        {selectedFillings && (
          <ul className={`${styles.list} custom-scroll pr-2`}>
            {selectedFillings.map((ingridient, index) => {
              return (
                <BurgerComponent
                  key={ingridient.uniqueId}
                  data={ingridient}
                  uniqueId={ingridient.uniqueId}
                  index={index}
                  moveCard={moveCard}
                />
              );
            })}
          </ul>
        )}

        {selectedBun && (
          <ConstructorElement
            extraClass="mr-2 ml-4"
            type="bottom"
            isLocked
            text={`${selectedBun.name} (низ)`}
            price={selectedBun.price}
            thumbnail={selectedBun.image}
          />
        )}
      </div>

      <div className={`${styles.info} mt-10 pr-4`}>
        <Total />

        <Button
          onClick={onOpen}
          htmlType="button"
          type="primary"
          size="large"
          style={{
            cursor: selectedBun ? "pointer" : "not-allowed",
          }}
        >
          {!orderRequest ? "Оформить заказ" : "Создаем заказ ..."}
        </Button>
      </div>
      {isOpen && (
        <Modal onClose={onClose}>
          <OrderDetails onClose={onClose} />
        </Modal>
      )}
    </div>
  );
};

export default BurgerConstructor;
