import React from "react";
import {
  CurrencyIcon,
  Button,
  ConstructorElement,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./burger-constructor.module.css";
import BurgerComponent from "../burger-component/burger-component.jsx";
import Total from "../total/total";
import burgerIngridientsPropTypes from "../../utils/prop-types";
import PropTypes from "prop-types";
import ingridientTypes from "../../utils/constants";

class BurgerConstructor extends React.Component {
  render() {
    return (
      <div>
        <div className={`${styles.elements} mt-25`}>
          <ConstructorElement
            extraClass="mr-2 ml-4"
            type="top"
            isLocked
            text={this.props.data[0].name}
            price={this.props.data[0].price}
            thumbnail={this.props.data[0].image}
          />
          <ul className={`${styles.list} custom-scroll pr-2`}>
            {this.props.data.map(
              (ingridient, index) =>
                ingridient.type != ingridientTypes.bun && (
                  <BurgerComponent key={index} data={ingridient} />
                )
            )}
          </ul>
          <ConstructorElement
            extraClass="mr-2 ml-4"
            type="bottom"
            isLocked
            text={this.props.data[0].name}
            price={this.props.data[0].price}
            thumbnail={this.props.data[0].image}
          />
        </div>
        <div className={`${styles.info} mt-10 pr-4`}>
          <div className={`${styles.price} mr-10`}>
            <Total total={610}> </Total>
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

BurgerConstructor.propTypes = {
  data: PropTypes.arrayOf(burgerIngridientsPropTypes).isRequired,
};

export default BurgerConstructor;
