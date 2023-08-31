import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import Main from "../components/main/main";

export const Home = () => {
  return (
    <DndProvider backend={HTML5Backend}>
      <Main />
    </DndProvider>
  );
};
