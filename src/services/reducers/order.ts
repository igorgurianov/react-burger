import {
  GET_ORDER_SUCCESS,
  GET_ORDER_FAILED,
  GET_ORDER_REQUEST,
  CLOSE_ORDER_INFO,
} from "../actions/order";
import { TOrder } from "../types/data";

import { TOrderActions } from "../actions/order";

export type TOrderState = {
  isOpen: boolean;
  order: number | null;
  orderRequest: boolean;
  orderFailed: boolean;
};

const initialState = {
  isOpen: false,
  order: null,
  orderRequest: false,
  orderFailed: false,
};

export const orderReducer = (
  state: TOrderState = initialState,
  action: TOrderActions
) => {
  switch (action.type) {
    case GET_ORDER_SUCCESS:
      return {
        ...state,
        order: action.payload,
        isOpen: true,
        orderFailed: false,
        orderRequest: false,
      };
    case CLOSE_ORDER_INFO:
      return {
        ...state,
        isOpen: false,
        order: null,
      };
    case GET_ORDER_FAILED: {
      return {
        ...initialState,
        orderFailed: true,
      };
    }
    case GET_ORDER_REQUEST: {
      return { ...state, orderRequest: true };
    }

    default:
      return state;
  }
};
