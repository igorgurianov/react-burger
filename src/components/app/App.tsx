import React from "react";
import "./App.css";
import AppHeader from "../header/header";
import Main from "../main/main";
import data from "../../utils/data";

function App() {
  return (
    <>
      <AppHeader className="mb-4" />
      <Main data={data} />
    </>
  );
}

export default App;
