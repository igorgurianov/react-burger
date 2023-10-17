export const WS_HISTORY_CONNECT = "WS_HISTORY_CONNECT";
export const WS_HISTORY_DISCONNECT = "WS_HISTORY_DISCONNECT";
export const WS_HISTORY_CONNECTING = "WS_HISTORY_CONNECTING";

export const WS_HISTORY_OPEN = "WS_HISTORY_OPEN";
export const WS_HISTORY_CLOSE = "WS_HISTORY_CLOSE";
export const WS_HISTORY_ERROR = "WS_HISTORY_ERROR";
export const WS_HISTORY_MESSAGE = "WS_HISTORY_MESSAGE";

export const wsHistoryConnect = (url) => ({
  type: WS_HISTORY_CONNECT,
  payload: url,
});

export const wsHistoryDisconnect = () => ({
  type: WS_HISTORY_DISCONNECT,
});
