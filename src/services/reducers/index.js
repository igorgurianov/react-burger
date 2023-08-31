import { combineReducers } from "redux";
import { ingridientsReducer } from "./ingridients";
import { constructorReducer } from "./constructor";
import { detailsReducer } from "./details";
import { orderReducer } from "./order";
import { userReducer } from "./user";

export const rootReducer = combineReducers({
  ingridients: ingridientsReducer,
  burgerConstructor: constructorReducer,
  details: detailsReducer,
  order: orderReducer,
  user: userReducer,
});
