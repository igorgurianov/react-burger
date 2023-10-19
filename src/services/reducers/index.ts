import { combineReducers } from "redux";
import { ingridientsReducer } from "./ingridients";
import { constructorReducer } from "./constructor";
import { detailsReducer } from "./details";
import { orderReducer } from "./order";
import { userReducer } from "./user";
import { orderFeedReducer } from "./order-feed";
import { orderDetailsReducer } from "./order-details";
import { orderHistoryReducer } from "./order-history";

export const rootReducer = combineReducers({
  ingridients: ingridientsReducer,
  burgerConstructor: constructorReducer,
  details: detailsReducer,
  order: orderReducer,
  user: userReducer,
  orderFeed: orderFeedReducer,
  orderHistory: orderHistoryReducer,
  orderDetails: orderDetailsReducer,
});

export type AppState = ReturnType<typeof rootReducer>;
