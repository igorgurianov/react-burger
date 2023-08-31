import { useEffect } from "react";
import AppHeader from "../header/header";
import Main from "../main/main";

import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { getItems } from "../../services/actions";
import { useDispatch } from "react-redux";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getItems());
  }, [dispatch]);

  return (
    <>
      <AppHeader className="mb-4" />
      <DndProvider backend={HTML5Backend}>
        <Main />
      </DndProvider>
    </>
  );
}

export default App;
