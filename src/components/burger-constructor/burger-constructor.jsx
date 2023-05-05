import React from "react";
import {
  CurrencyIcon,
  Button,
  ConstructorElement,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./burger-constructor.module.css";
import BurgerComponent from "../burger-component/burger-component.jsx";

// На данном этапе выполнения задания компонент BurgerConstructor не принимает пропсы,
// поэтому проверка типов в компоненте BurgerComponent

class BurgerConstructor extends React.Component {
  render() {
    return (
      <div>
        <div className={`${styles.elements} mt-25`}>
          <ConstructorElement
            extraClass="mr-2 ml-4"
            type="top"
            isLocked={true}
            text="Краторная булка N-200i (верх)"
            price={20}
            thumbnail="https://code.s3.yandex.net/react/code/bun-02.png"
          ></ConstructorElement>
          <ul className={`${styles.list} custom-scroll pr-2`}>
            <BurgerComponent
              text="Соус традиционный галактический"
              price={30}
              thumbnail="https://code.s3.yandex.net/react/code/meat-04.png"
            />
            <BurgerComponent
              text="Мясо бессмертных моллюсков Protostomia"
              price={300}
              thumbnail="https://code.s3.yandex.net/react/code/meat-04.png"
            />
            <BurgerComponent
              text="Плоды Фалленианского дерева"
              price={80}
              thumbnail="https://code.s3.yandex.net/react/code/meat-04.png"
            />
            <BurgerComponent
              text="Хрустящие минеральные кольца"
              price={80}
              thumbnail="https://code.s3.yandex.net/react/code/meat-04.png"
            />
            <BurgerComponent
              text="Хрустящие минеральные кольца"
              price={80}
              thumbnail="https://code.s3.yandex.net/react/code/meat-04.png"
            />
            <BurgerComponent
              text="Говяжий метеорит (отбивная)"
              price={200}
              thumbnail="https://code.s3.yandex.net/react/code/meat-04.png"
            />
            <BurgerComponent
              text="Говяжий метеорит (отбивная)"
              price={200}
              thumbnail="https://code.s3.yandex.net/react/code/meat-04.png"
            />
            <BurgerComponent
              text="Говяжий метеорит (отбивная)"
              price={200}
              thumbnail="https://code.s3.yandex.net/react/code/meat-04.png"
            />
          </ul>
          <ConstructorElement
            extraClass="mr-2 ml-4"
            type="bottom"
            isLocked={true}
            text="Краторная булка N-200i (низ)"
            price={20}
            thumbnail="https://code.s3.yandex.net/react/code/bun-02.png"
          ></ConstructorElement>
        </div>
        <div className={`${styles.info} mt-10 pr-4`}>
          <div className={`${styles.price} mr-10`}>
            <p className="text text_type_digits-medium mr-3">610</p>
            <CurrencyIcon type="primary" />
          </div>

          <Button htmlType="button" type="primary" size="large">
            Оформить заказ
          </Button>
        </div>
      </div>
    );
  }
}

export default BurgerConstructor;
