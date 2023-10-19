export const WS_ORDER_FEED_OPEN: "WS_ORDER_FEED_OPEN" = "WS_ORDER_FEED_OPEN";
export const WS_ORDER_FEED_ERROR: "WS_ORDER_FEED_ERROR" = "WS_ORDER_FEED_ERROR";
export const WS_ORDER_FEED_CLOSE: "WS_ORDER_FEED_CLOSE" = "WS_ORDER_FEED_CLOSE";
export const WS_ORDER_FEED_MESSAGE: "WS_ORDER_FEED_MESSAGE" =
  "WS_ORDER_FEED_MESSAGE";
export const WS_ORDER_FEED_CONNECT: "WS_ORDER_FEED_CONNECT" =
  "WS_ORDER_FEED_CONNECT";
export const WS_ORDER_FEED_DISCONNECT: "WS_ORDER_FEED_DISCONNECT" =
  "WS_ORDER_FEED_DISCONNECT";
export const WS_ORDER_FEED_CONNECTING: "WS_ORDER_FEED_CONNECTING" =
  "WS_ORDER_FEED_CONNECTING";

export interface IWsOrderFeedOpen {
  readonly type: typeof WS_ORDER_FEED_OPEN;
}
export interface IWsOrderFeedError {
  readonly type: typeof WS_ORDER_FEED_ERROR;
  readonly payload: any;
}
export interface IWsOrderFeedClose {
  readonly type: typeof WS_ORDER_FEED_CLOSE;
}
export interface IWsOrderFeedMessage {
  readonly type: typeof WS_ORDER_FEED_MESSAGE;
  readonly payload: any;
}
export interface IWsOrderFeedConnect {
  readonly type: typeof WS_ORDER_FEED_CONNECT;
  readonly payload: string;
}
export interface IWsOrderFeedDisconnect {
  readonly type: typeof WS_ORDER_FEED_DISCONNECT;
}
export interface IWsOrderFeedConnecting {
  readonly type: typeof WS_ORDER_FEED_CONNECTING;
}

export type TOrderFeedActions =
  | IWsOrderFeedOpen
  | IWsOrderFeedError
  | IWsOrderFeedClose
  | IWsOrderFeedMessage
  | IWsOrderFeedConnect
  | IWsOrderFeedDisconnect
  | IWsOrderFeedConnecting;

export const wsFeedConnect = (url: string): IWsOrderFeedConnect => ({
  type: WS_ORDER_FEED_CONNECT,
  payload: url,
});

export const wsFeedDisconnect = (): IWsOrderFeedDisconnect => ({
  type: WS_ORDER_FEED_DISCONNECT,
});
