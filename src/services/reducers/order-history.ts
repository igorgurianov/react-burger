import {
  WS_HISTORY_CONNECTING,
  WS_HISTORY_CLOSE,
  WS_HISTORY_ERROR,
  WS_HISTORY_MESSAGE,
  WS_HISTORY_OPEN,
} from "../actions/order-history";
import { TOrderHistoryActions } from "../actions/order-history";
import { TOrder } from "../types/data";

export type TOrderHistoryState = {
  wsConnected: boolean;
  isConnecting: boolean;
  orders: ReadonlyArray<TOrder>;
  error: boolean;
};

const initialState = {
  wsConnected: false,
  isConnecting: false,
  orders: [],
  error: false,
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
        error: false,
        wsConnected: true,
        isConnecting: false,
      };

    case WS_HISTORY_ERROR:
      return {
        ...state,
        error: true,
        wsConnected: false,
      };

    case WS_HISTORY_CLOSE:
      return {
        ...state,
        error: false,
        wsConnected: false,
        orders: [],
      };

    case WS_HISTORY_MESSAGE:
      return {
        ...state,
        error: false,
        orders: action.payload,
      };

    default:
      return state;
  }
};
