import { ThunkAction, ThunkDispatch } from "redux-thunk";
import { TConstructorActions } from "../actions/constructor";
import { TIngredientDetailsActions } from "../actions/details";
import { TIngridientsActions } from "../actions";
import { TOrderDetailsActions } from "../actions/order-details";
import { TOrderFeedActions } from "../actions/order-feed";
import { TOrderHistoryActions } from "../actions/order-history";
import { TOrderActions } from "../actions/order";
import { TUserActions } from "../actions/user";
import { rootReducer } from "../reducers";

export type AppState = ReturnType<typeof rootReducer>;

type AppActions =
  | TConstructorActions
  | TIngredientDetailsActions
  | TIngridientsActions
  | TOrderDetailsActions
  | TOrderFeedActions
  | TOrderHistoryActions
  | TOrderActions
  | TUserActions;

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  AppState,
  unknown,
  AppActions
>;

export type AppDispatch = ThunkDispatch<AppState, never, AppActions>;
