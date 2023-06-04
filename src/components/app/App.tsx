import React, { useEffect, useState } from "react";
import "./App.css";
import AppHeader from "../header/header";
import Main from "../main/main";
import api from "../../utils/api";

function App() {
  const [state, setState] = useState();

  const getIngridients = () => {
    api().then((res) => {
      setState(res.data);
    });
  };

  useEffect(() => {
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
