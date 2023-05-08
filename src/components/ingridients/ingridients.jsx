import React from "react";
import IngredientCard from "../ingridient-card/ingridient-card";
import styles from "./ingridients.module.css";
import PropTypes from "prop-types";
import burgerIngridientsPropTypes from "../../utils/prop-types";
import ingridientTypes from "../../utils/constants";

class Ingridients extends React.Component {
  checkArray(ingridient, type) {
    return ingridient.type === type;
  }

  filterArray(type) {
    return this.props.data.filter((ingridient) =>
      this.checkArray(ingridient, type)
    );
  }

  render() {
    return (
      <div className={`${styles.wrapper} custom-scroll mt-10`}>
        <h2 className="text text_type_main-medium">Булки</h2>
        <div className={`${styles.container} pt-6 pl-4 pr-4 pb-10`}>
          {this.filterArray(ingridientTypes.bun).map((ingridient, index) => (
            <IngredientCard key={index} data={ingridient} />
          ))}
        </div>
        <h2 className="text text_type_main-medium">Соусы</h2>
        <div className={`${styles.container} pt-6 pl-4 pr-4 pb-10`}>
          {this.filterArray(ingridientTypes.sauce).map(
            (ingridient, index) =>
              ingridient.type === ingridientTypes.sauce && (
                <IngredientCard key={index} data={ingridient} />
              )
          )}
        </div>
        <h2 className="text text_type_main-medium">Начинки</h2>
        <div className={`${styles.container} pt-6 pl-4 pr-4 pb-10`}>
          {this.filterArray(ingridientTypes.main).map((ingridient, index) => (
            <IngredientCard key={index} data={ingridient} />
          ))}
        </div>
      </div>
    );
  }
}

Ingridients.propTypes = {
  data: PropTypes.arrayOf(burgerIngridientsPropTypes).isRequired,
};

export default Ingridients;
