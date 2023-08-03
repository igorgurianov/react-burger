import { combineReducers } from "redux";
import { ingridientsReducer } from "./ingridients";
import { constructorReducer } from "./constructor";
import { detailsReducer } from "./details";
import { orderReducer } from "./order";

export const rootReducer = combineReducers({
  ingridients: ingridientsReducer,
  constructor: constructorReducer,
  details: detailsReducer,
  order: orderReducer,
});
