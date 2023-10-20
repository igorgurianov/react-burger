import {
  GET_ITEMS_SUCCESS,
  GET_ITEMS_FAILED,
  GET_ITEMS_REQUEST,
} from "../actions";

import { TIngredient } from "../types/data";
import { TIngridientsActions } from "../actions";

export type TIngridientsState = {
  allItems?: TIngredient[];
  itemsRequest: boolean;
  itemsFailed: boolean;
};

const initialState = {
  allItems: [],
  itemsRequest: false,
  itemsFailed: false,
};

export const ingridientsReducer = (
  state: TIngridientsState = initialState,
  action: TIngridientsActions
) => {
  switch (action.type) {
    case GET_ITEMS_REQUEST:
      return {
        ...state,
        itemsRequest: true,
      };
    case GET_ITEMS_FAILED:
      return {
        ...state,
        itemsRequest: false,
        itemsFailed: true,
      };
    case GET_ITEMS_SUCCESS:
      return {
        ...state,
        allItems: action.payload,
      };
    default:
      return state;
  }
};
