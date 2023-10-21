import { useEffect, useState, useRef } from "react";
import IngredientCard from "../ingridient-card/ingridient-card";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./ingridients.module.css";
import ingridientTypes from "../../utils/constants";
import { GET_INGRIDIENT_DETAILS } from "../../services/actions/details";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { TIngredient } from "../../services/types/data";

type PositionList = Record<string, number>;

const Ingridients = () => {
  const dispatch = useAppDispatch();

  const allIngridients = useAppSelector((store) => store.ingridients);

  const [positionList, setPositionList] = useState<PositionList>({});
  const [containerTop, setContainerTop] = useState<number>(0);
  const [activeTab, setActiveTab] = useState<string>("bunHeader");

  const onOpen = (ingridient: TIngredient) => {
    console.log(ingridient);
    dispatch({ type: GET_INGRIDIENT_DETAILS, payload: ingridient });
  };

  const checkArray = (ingridient: TIngredient, type: string): boolean => {
    return ingridient.type === type;
  };

  const filterArray = (type: string) => {
    return allIngridients.allItems.filter((ingridient) =>
      checkArray(ingridient, type)
    );
  };

  //Рефы заголовков
  const bunHeader = useRef<HTMLHeadingElement>(null);
  const sauceHeader = useRef<HTMLHeadingElement>(null);
  const fillinsHeader = useRef<HTMLHeadingElement>(null);
  const headerRefs = [bunHeader, sauceHeader, fillinsHeader];

  // Посчитать y-координаты каждого заголовка
  const handleScroll = () => {
    const updatedPositions: Record<string, number> = {};

    headerRefs.forEach((ref, index) => {
      const elementPosition = ref.current
        ? Math.floor(ref.current.getBoundingClientRect().y)
        : 0;
      updatedPositions[headerRefs[index].current?.id ?? ""] = elementPosition;
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
    if (container) {
      const containerRect = container.getBoundingClientRect();
      setContainerTop(containerRect.top);
    }
  }, []);

  return (
    <div>
      <div className={`${styles.tabs} mt-5`}>
        <Tab value="one" active={activeTab === "bunHeader"} onClick={() => {}}>
          Булки
        </Tab>
        <Tab
          value="two"
          active={activeTab === "sauceHeader"}
          onClick={() => {}}
        >
          Соусы
        </Tab>
        <Tab
          value="three"
          active={activeTab === "fillinsHeader"}
          onClick={() => {}}
        >
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
      </div>
    </div>
  );
};

export default Ingridients;
