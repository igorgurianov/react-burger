import styles from "./ingredient-details.module.css";
import PropTypes from "prop-types";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

const IngredientDetails = ({ style }) => {
  const allIngridients = useSelector((store) => store.ingridients.allItems);
  const id = useParams();

  const [ingridient, setIngridient] = useState();

  useEffect(() => {
    setIngridient(
      allIngridients.find((ingridient) => ingridient._id === id.ingredientId)
    );
  }, [ingridient, allIngridients, id]);

  return (
    ingridient && (
      <div
        className={`${styles.wrapper} pt-10 pb-15 pl-10 pr-10`}
        style={
          style === "page"
            ? { backgroundColor: "transparent", marginTop: "80px" }
            : { backgroundColor: "#1C1C21" }
        }
      >
        <div className={styles.title}>
          <h3 className={`${styles.header} text text_type_main-large`}>
            Детали ингридиента
          </h3>
          {/* <CloseIcon className={styles.closeIcon} onClick={() => onClose()} /> */}
        </div>
        <img
          className={styles.image}
          src={ingridient.image}
          alt={ingridient.name}
        />
        <h4 className="text text_type_main-medium mt-4 mb-8">
          {ingridient.name}
        </h4>
        <ul className={styles.nutritionList}>
          <li className={styles.nutritionItem}>
            <p className="text text_type_main-default">Калории,ккал</p>
            <p className="text text_type_digits-default">
              {ingridient.calories}
            </p>
          </li>
          <li className={styles.nutritionItem}>
            <p className="text text_type_main-default">Белки, г</p>
            <p className="text text_type_digits-default">
              {ingridient.proteins}
            </p>
          </li>
          <li className={styles.nutritionItem}>
            <p className="text text_type_main-default">Жиры, г</p>
            <p className="text text_type_digits-default">{ingridient.fat}</p>
          </li>
          <li className={styles.nutritionItem}>
            <p className="text text_type_main-default">Углеводы, г</p>
            <p className="text text_type_digits-default">
              {ingridient.carbohydrates}
            </p>
          </li>
        </ul>
      </div>
    )
  );
};

IngredientDetails.propTypes = {
  style: PropTypes.string.isRequired,
};

export default IngredientDetails;
