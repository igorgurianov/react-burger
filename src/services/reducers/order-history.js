import {
  WS_HISTORY_CLOSED,
  WS_HISTORY_ERROR,
  WS_HISTORY_START,
  WS_HISTORY_SUCCESS,
  WS_HISTORY_GET_MESSAGE,
} from "../actions/order-history";

const initialState = {
  wsConnected: false,
  isConnecting: false,
  orders: [],
  error: undefined,
};

export const orderHistoryReducer = (state = initialState, action) => {
  switch (action.type) {
    case WS_HISTORY_START: {
      return { ...state, isConnecting: true };
    }

    case WS_HISTORY_SUCCESS:
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

    case WS_HISTORY_CLOSED:
      return {
        ...state,
        error: undefined,
        wsConnected: false,
        orders: [],
      };

    case WS_HISTORY_GET_MESSAGE:
      return {
        ...state,
        error: undefined,
        orders: action.payload,
      };
    default:
      return state;
  }
};
