import React, { useContext, useEffect, useState, useReducer } from "react";
import "./App.css";
import AppHeader from "../header/header";
import Main from "../main/main";
import { api } from "../../utils/api";
import ingridientTypes from "../../utils/constants";

import { IngridientsContex } from "../../context/IngridientsContext";
import { ConstructorContext } from "../../context/ConstructorContex";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

function App() {
  // Состояние полного набора ингридиентов слева
  const [ingridients, setIngridients] = useState(["check"]);

  // // Состояние конструктора ингридиентов справа
  // const [constructor, setConstructor] = useState({ bun: [], fillings: [] });

  //Состояние тотала
  const [order, setOrder] = useState(null);

  // Для подсчета стоимости
  const [total, dispatch] = useReducer(reducer, { count: 0 });

  const getIngridients = () => {
    api().then((res) => {
      setIngridients(res.data);
    });
  };

  function reducer(total: any, ingridient: any) {
    if (ingridient.type === ingridientTypes.bun) {
      return { count: total.count + ingridient.price * 2 };
    } else
      return {
        count: total.count + ingridient.price,
      };
  }

  const updateTotal = (ingridient: any) => {
    dispatch(ingridient);
  };

  useEffect(() => {
    getIngridients();
  }, []);

  return (
    <>
      <AppHeader className="mb-4" />
      <IngridientsContex.Provider value={{ ingridients, setIngridients }}>
        <DndProvider backend={HTML5Backend}>
          <Main />
        </DndProvider>
      </IngridientsContex.Provider>
    </>
  );
}

export default App;
