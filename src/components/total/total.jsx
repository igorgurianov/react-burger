import { useContext, useReducer } from "react";
import { ConstructorContext } from "../../context/ConstructorContex";

const Total = () => {
  const { total } = useContext(ConstructorContext);
  //

  return (
    <div>
      <p className="text text_type_digits-medium mr-3">{total.count}</p>
    </div>
  );
};

export default Total;
