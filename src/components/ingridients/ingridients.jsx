import React from "react";
import IngredientCard from "../ingridient-card/ingridient-card";
import styles from "./ingridients.module.css";

class Ingridients extends React.Component {
  render() {
    return (
      <div className={`${styles.wrapper} custom-scroll mt-10`}>
        <h2 className="text text_type_main-medium">Булки</h2>
        <div className={`${styles.container} pt-6 pl-4 pr-4 pb-10`}>
          {this.props.data.map(
            (ingridient, index) =>
              ingridient.type === "bun" && (
                <IngredientCard key={index} data={ingridient}></IngredientCard>
              )
          )}
        </div>
        <h2 className="text text_type_main-medium">Соусы</h2>
        <div className={`${styles.container} pt-6 pl-4 pr-4 pb-10`}>
          {this.props.data.map(
            (ingridient, index) =>
              ingridient.type === "sauce" && (
                <IngredientCard key={index} data={ingridient}></IngredientCard>
              )
          )}
        </div>
        <h2 className="text text_type_main-medium">Начинки</h2>
        <div className={`${styles.container} pt-6 pl-4 pr-4 pb-10`}>
          {this.props.data.map(
            (ingridient, index) =>
              ingridient.type === "main" && (
                <IngredientCard key={index} data={ingridient}></IngredientCard>
              )
          )}
        </div>
      </div>
    );
  }
}

export default Ingridients;
