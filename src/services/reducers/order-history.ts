import {
  WS_HISTORY_CONNECTING,
  WS_HISTORY_CLOSE,
  WS_HISTORY_ERROR,
  WS_HISTORY_MESSAGE,
  WS_HISTORY_OPEN,
} from "../actions/order-history";
import { TOrderHistoryActions } from "../actions/order-history";

export type TOrderHistoryState = {
  wsConnected: boolean;
  isConnecting: boolean;
  orders: any[];
  error: any;
};

const initialState = {
  wsConnected: false,
  isConnecting: false,
  orders: [],
  error: undefined,
};

export const orderHistoryReducer = (
  state: TOrderHistoryState = initialState,
  action: TOrderHistoryActions
) => {
  switch (action.type) {
    case WS_HISTORY_CONNECTING: {
      return { ...state, isConnecting: true };
    }

    case WS_HISTORY_OPEN:
      return {
        ...state,
        error: undefined,
        wsConnected: true,
        isConnecting: false,
      };

    case WS_HISTORY_ERROR:
      return {
        ...state,
        error: action.payload,
        wsConnected: false,
      };

    case WS_HISTORY_CLOSE:
      return {
        ...state,
        error: undefined,
        wsConnected: false,
        orders: [],
      };

    case WS_HISTORY_MESSAGE:
      return {
        ...state,
        error: undefined,
        orders: action.payload,
      };
    default:
      return state;
  }
};