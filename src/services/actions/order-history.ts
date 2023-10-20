export const WS_HISTORY_CONNECT: "WS_HISTORY_CONNECT" = "WS_HISTORY_CONNECT";
export const WS_HISTORY_DISCONNECT: "WS_HISTORY_DISCONNECT" =
  "WS_HISTORY_DISCONNECT";
export const WS_HISTORY_CONNECTING: "WS_HISTORY_CONNECTING" =
  "WS_HISTORY_CONNECTING";

export const WS_HISTORY_OPEN: "WS_HISTORY_OPEN" = "WS_HISTORY_OPEN";
export const WS_HISTORY_CLOSE: "WS_HISTORY_CLOSE" = "WS_HISTORY_CLOSE";
export const WS_HISTORY_ERROR: "WS_HISTORY_ERROR" = "WS_HISTORY_ERROR";
export const WS_HISTORY_MESSAGE: "WS_HISTORY_MESSAGE" = "WS_HISTORY_MESSAGE";

export interface IWsHistoryConnect {
  readonly type: typeof WS_HISTORY_CONNECT;
  readonly payload: string;
}
export interface IWsHistoryDisconnect {
  readonly type: typeof WS_HISTORY_DISCONNECT;
}
export interface IWsHistoryConnecting {
  readonly type: typeof WS_HISTORY_CONNECTING;
}
export interface IWsHistoryOpen {
  readonly type: typeof WS_HISTORY_OPEN;
}
export interface IWsHistoryClose {
  readonly type: typeof WS_HISTORY_CLOSE;
}
export interface IWsHistoryError {
  readonly type: typeof WS_HISTORY_ERROR;
  readonly payload: string;
}
export interface IWsHistoryMessage {
  readonly type: typeof WS_HISTORY_MESSAGE;
  readonly payload: string;
}

export type TOrderHistoryActions =
  | IWsHistoryDisconnect
  | IWsHistoryConnect
  | IWsHistoryConnecting
  | IWsHistoryOpen
  | IWsHistoryClose
  | IWsHistoryError
  | IWsHistoryMessage;

export const wsHistoryConnect = (url: string): IWsHistoryConnect => ({
  type: WS_HISTORY_CONNECT,
  payload: url,
});

export const wsHistoryDisconnect = (): IWsHistoryDisconnect => ({
  type: WS_HISTORY_DISCONNECT,
});
