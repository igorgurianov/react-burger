import {
  WS_ORDER_FEED_CLOSE,
  WS_ORDER_FEED_ERROR,
  WS_ORDER_FEED_MESSAGE,
  WS_ORDER_FEED_OPEN,
  WS_ORDER_FEED_CONNECTING,
  WS_ORDER_FEED_DISCONNECT,
} from "../actions/order-feed";

import { TOrderFeedActions } from "../actions/order-feed";
import { TOrder, TWebSocketResponse } from "../types/data";

export type TOrderFeedState = {
  wsConnected: boolean;
  isConnecting: boolean;
  orders: TWebSocketResponse[] | null;
  error: boolean;
};

const initialState: TOrderFeedState = {
  wsConnected: false,
  isConnecting: false,
  orders: [],
  error: false,
};

export const orderFeedReducer = (
  state = initialState,
  action: TOrderFeedActions
) => {
  switch (action.type) {
    case WS_ORDER_FEED_CONNECTING: {
      return { ...state, isConnecting: true };
    }

    case WS_ORDER_FEED_OPEN:
      return {
        ...state,
        error: false,
        wsConnected: true,
        isConnecting: false,
      };

    case WS_ORDER_FEED_ERROR:
      return {
        ...state,
        error: true,
        wsConnected: false,
      };

    case WS_ORDER_FEED_CLOSE:
      return {
        ...state,
        error: false,
        wsConnected: false,
        orders: [],
      };
    case WS_ORDER_FEED_DISCONNECT:
      return {
        ...state,
        error: false,
        wsConnected: false,
        orders: [],
      };

    case WS_ORDER_FEED_MESSAGE:
      return {
        ...state,
        error: false,
        orders: action.payload,
      };
    default:
      return state;
  }
};
