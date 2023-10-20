import {
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_SUCCESS,
  ORDER_DETAILS_REMOVE,
  ORDER_DETAILS_FAILED,
} from "../actions/order-details";

import { TOrder } from "../types/data";
import { TOrderDetailsActions } from "../actions/order-details";

export type TOrderDetails = {
  isLoading: boolean;
  success: boolean;
  order: ReadonlyArray<TOrder>;
};

const initialState = {
  isLoading: false,
  success: false,
  order: [],
};

export const orderDetailsReducer = (
  state: TOrderDetails = initialState,
  action: TOrderDetailsActions
) => {
  switch (action.type) {
    case ORDER_DETAILS_REQUEST:
      return {
        ...state,
        isLoading: true,
      };

    case ORDER_DETAILS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        success: true,
        order: action.payload,
      };

    case ORDER_DETAILS_REMOVE:
      return {
        ...state,
        isLoading: false,
        order: [],
      };

    case ORDER_DETAILS_FAILED:
      return {
        ...state,
        success: false,
        isLoading: false,
      };

    default:
      return state;
  }
};
