import { compose, createStore, applyMiddleware } from "redux";
import { rootReducer } from "./reducers";
import thunk from "redux-thunk";
import { socketMiddleware } from "./middleware/socketMiddleware";
import {
  WS_CONNECTION_START,
  WS_SEND_MESSAGE,
  WS_CONNECTION_SUCCESS,
  WS_CONNECTION_CLOSED,
  WS_CONNECTION_ERROR,
  WS_GET_MESSAGE,
} from "./actions/order-feed";
import {
  WS_HISTORY_CLOSED,
  WS_HISTORY_START,
  WS_HISTORY_GET_MESSAGE,
  WS_HISTORY_SUCCESS,
  WS_HISTORY_ERROR,
  WS_HISTORY_SEND_MESSAGE,
} from "./actions/order-history";

const composeEnhancers =
  typeof window === "object" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose;

const orderFeedActions = {
  wsInit: WS_CONNECTION_START,
  wsSendMessage: WS_SEND_MESSAGE,
  onOpen: WS_CONNECTION_SUCCESS,
  onClose: WS_CONNECTION_CLOSED,
  onError: WS_CONNECTION_ERROR,
  onMessage: WS_GET_MESSAGE,
};

const orderHistoryActions = {
  wsInit: WS_HISTORY_START,
  wsSendMessage: WS_HISTORY_SEND_MESSAGE,
  onOpen: WS_HISTORY_SUCCESS,
  onClose: WS_HISTORY_CLOSED,
  onError: WS_HISTORY_ERROR,
  onMessage: WS_HISTORY_GET_MESSAGE,
};

export const store = createStore(
  rootReducer,
  composeEnhancers(
    applyMiddleware(
      thunk,
      socketMiddleware(orderFeedActions),
      socketMiddleware(orderHistoryActions)
    )
  )
);
