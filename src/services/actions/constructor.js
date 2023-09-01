import { v4 as uuidv4 } from "uuid";
export const ADD_FILLING = "ADD_FILLING";
export const ADD_BUN = "ADD_BUN";
export const REMOVE_FILLING = "REMOVE_FILLING";
export const ORDER_INGRIDIENTS = "ORDER_INGRIDIENTS";
export const ADD_INGRIDIENT = "ADD_INGRIDIENT";
export const RESET_CONSTRUCTOR = "RESET_CONSTRUCTOR";

export const addIngridient = (item) => {
  return {
    type: ADD_INGRIDIENT,
    payload: {
      ...item,
      uniqueId: uuidv4(),
    },
  };
};
