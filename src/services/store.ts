import { compose, createStore, applyMiddleware } from "redux";
import { rootReducer } from "./reducers";
import thunk from "redux-thunk";
import { socketMiddleware } from "./middleware/socketMiddleware";
import {
  WS_ORDER_FEED_CONNECT,
  WS_ORDER_FEED_DISCONNECT,
  WS_ORDER_FEED_CONNECTING,
  WS_ORDER_FEED_OPEN,
  WS_ORDER_FEED_CLOSE,
  WS_ORDER_FEED_ERROR,
  WS_ORDER_FEED_MESSAGE,
} from "./actions/order-feed";
import {
  WS_HISTORY_CONNECT,
  WS_HISTORY_DISCONNECT,
  WS_HISTORY_CONNECTING,
  WS_HISTORY_OPEN,
  WS_HISTORY_CLOSE,
  WS_HISTORY_ERROR,
  WS_HISTORY_MESSAGE,
} from "./actions/order-history";

const composeEnhancers =
  (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const orderFeedActions = {
  wsConnect: WS_ORDER_FEED_CONNECT,
  wsDisconnect: WS_ORDER_FEED_DISCONNECT,
  wsConnecting: WS_ORDER_FEED_CONNECTING,
  onOpen: WS_ORDER_FEED_OPEN,
  onClose: WS_ORDER_FEED_CLOSE,
  onError: WS_ORDER_FEED_ERROR,
  onMessage: WS_ORDER_FEED_MESSAGE,
};

const orderHistoryActions = {
  wsConnect: WS_HISTORY_CONNECT,
  wsDisconnect: WS_HISTORY_DISCONNECT,
  wsConnecting: WS_HISTORY_CONNECTING,
  onOpen: WS_HISTORY_OPEN,
  onClose: WS_HISTORY_CLOSE,
  onError: WS_HISTORY_ERROR,
  onMessage: WS_HISTORY_MESSAGE,
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
