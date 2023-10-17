import {
  WS_ORDER_FEED_CLOSE,
  WS_ORDER_FEED_ERROR,
  WS_ORDER_FEED_MESSAGE,
  WS_ORDER_FEED_OPEN,
  WS_ORDER_FEED_CONNECTING,
} from "../actions/order-feed";

const initialState = {
  wsConnected: false,
  isConnecting: false,
  orders: [],
  error: undefined,
};

export const orderFeedReducer = (state = initialState, action) => {
  switch (action.type) {
    case WS_ORDER_FEED_CONNECTING: {
      return { ...state, isConnecting: true };
    }

    case WS_ORDER_FEED_OPEN:
      return {
        ...state,
        error: undefined,
        wsConnected: true,
        isConnecting: false,
      };

    case WS_ORDER_FEED_ERROR:
      return {
        ...state,
        error: action.payload,
        wsConnected: false,
      };

    case WS_ORDER_FEED_CLOSE:
      return {
        ...state,
        error: undefined,
        wsConnected: false,
        orders: [],
      };

    case WS_ORDER_FEED_MESSAGE:
      return {
        ...state,
        error: undefined,
        orders: action.payload,
      };
    default:
      return state;
  }
};
