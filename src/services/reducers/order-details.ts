import {
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_SUCCESS,
  ORDER_DETAILS_REMOVE,
  ORDER_DETAILS_FAILED,
} from "../actions/order-details";

import { IOrderData, TOrder, TOrderInfoResponse } from "../types/data";
import { TOrderDetailsActions } from "../actions/order-details";

export type TOrderDetailsState = {
  isLoading: boolean;
  success: boolean;
  order: TOrder | null;
};

const initialState = {
  isLoading: false,
  success: false,
  order: null,
};

export const orderDetailsReducer = (
  state: TOrderDetailsState = initialState,
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
        order: action.payload.orders[0],
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
