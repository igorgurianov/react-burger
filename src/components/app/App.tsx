import React, { useEffect, useState } from "react";
import "./App.css";
import AppHeader from "../header/header";
import Main from "../main/main";
import url from "../../utils/api";

function App() {
  const [state, setState] = useState();

  useEffect(() => {
    const getIngridients = () => {
      fetch(`${url}`)
        .then((res) => res.json())
        .then((res) => setState(res.data))
        .catch((e) =>
          console.log(`"Произошла ошибка при запросе ингридиентов" - ${e}`)
        );
    };
    getIngridients();
  }, []);

  return (
    <>
      <AppHeader className="mb-4" />
      {state && <Main data={state} />}
    </>
  );
}

export default App;
