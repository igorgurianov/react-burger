import { useEffect, useState, useRef } from "react";
import IngredientCard from "../ingridient-card/ingridient-card";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./ingridients.module.css";
import ingridientTypes from "../../utils/constants";
import Modal from "../modal/modal";
import IngredientDetails from "../ingredient-details/ingredient-details";
import { useDispatch, useSelector } from "react-redux";
import {
  GET_INGRIDIENT_DETAILS,
  REMOVE_INGRIDIENT_DETAILS,
} from "../../services/actions/details";

const Ingridients = () => {
  const dispatch = useDispatch();

  const allIngridients = useSelector((store) => store.ingridients);
  const ingridientInfo = useSelector((store) => store.details);
  const [positionList, setPositionList] = useState({});
  const [containerTop, setContainerTop] = useState(0);
  const [activeTab, setActiveTab] = useState("bunHeader");

  const onOpen = (ingridient) => {
    dispatch({ type: GET_INGRIDIENT_DETAILS, payload: ingridient });
  };

  const onClose = () => {
    dispatch({ type: REMOVE_INGRIDIENT_DETAILS, payload: {} });
  };

  const checkArray = (ingridient, type) => {
    return ingridient.type === type;
  };

  const filterArray = (type) => {
    return allIngridients.allItems.filter((ingridient) =>
      checkArray(ingridient, type)
    );
  };

  //Рефы заголовков
  const bunHeader = useRef(null);
  const sauceHeader = useRef(null);
  const fillinsHeader = useRef(null);
  const headerRefs = [bunHeader, sauceHeader, fillinsHeader];

  // Посчитать y-координаты каждого заголовка
  const handleScroll = () => {
    const updatedPositions = {};

    headerRefs.forEach((ref, index) => {
      const elementPosition = Math.floor(ref.current.getBoundingClientRect().y);
      updatedPositions[headerRefs[index].current.id] = elementPosition;
    });

    setPositionList((prevState) => ({ ...prevState, ...updatedPositions }));
    findActiveTab();
  };

  //Найти ближайший заголовок к верху контейнера
  const findActiveTab = () => {
    let closestKey = Object.keys(positionList)[0];
    let minDifference = Math.abs(positionList[closestKey] - containerTop);

    Object.keys(positionList).forEach((key) => {
      const difference = Math.abs(positionList[key] - containerTop);
      if (difference < minDifference) {
        closestKey = key;
        minDifference = difference;
      }
    });

    setActiveTab(closestKey);
  };

  useEffect(() => {
    const container = document.querySelector(".custom-scroll");
    const containerRect = container.getBoundingClientRect();
    setContainerTop(containerRect.top);
  }, []);

  return (
    <div>
      <div className={`${styles.tabs} mt-5`}>
        <Tab value="one" active={activeTab === "bunHeader"}>
          Булки
        </Tab>
        <Tab value="two" active={activeTab === "sauceHeader"}>
          Соусы
        </Tab>
        <Tab value="three" active={activeTab === "fillinsHeader"}>
          Начинки
        </Tab>
      </div>

      <div
        className={`${styles.wrapper} custom-scroll mt-10`}
        onScroll={handleScroll}
      >
        <h2
          id="bunHeader"
          className={`text text_type_main-medium`}
          ref={bunHeader}
        >
          Булки
        </h2>
        <div className={`${styles.container} pt-6 pl-4 pr-4 pb-10`}>
          {filterArray(ingridientTypes.bun).map((ingridient, index) => (
            <IngredientCard key={index} data={ingridient} onOpen={onOpen} />
          ))}
        </div>
        <h2
          id="sauceHeader"
          className={`text text_type_main-medium`}
          ref={sauceHeader}
        >
          Соусы
        </h2>
        <div className={`${styles.container} pt-6 pl-4 pr-4 pb-10`}>
          {filterArray(ingridientTypes.sauce).map(
            (ingridient, index) =>
              ingridient.type === ingridientTypes.sauce && (
                <IngredientCard key={index} data={ingridient} onOpen={onOpen} />
              )
          )}
        </div>
        <h2
          id="fillinsHeader"
          className={`text text_type_main-medium`}
          ref={fillinsHeader}
        >
          Начинки
        </h2>
        <div className={`${styles.container} pt-6 pl-4 pr-4 pb-10`}>
          {filterArray(ingridientTypes.main).map((ingridient, index) => (
            <IngredientCard key={index} data={ingridient} onOpen={onOpen} />
          ))}
        </div>

        {ingridientInfo.state && (
          <Modal onClose={onClose}>
            <IngredientDetails
              ingridient={ingridientInfo.state}
              onClose={onClose}
            />
          </Modal>
        )}
      </div>
    </div>
  );
};

export default Ingridients;
