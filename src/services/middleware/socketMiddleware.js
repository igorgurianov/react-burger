export const socketMiddleware = (wsActions) => {
  return (store) => {
    let socket = null;

    return (next) => (action) => {
      const { dispatch } = store;
      const { type, payload } = action;
      const {
        wsConnect,
        wsSendMessage,
        wsInit,
        onOpen,
        onClose,
        onError,
        onMessage,
        wsConnecting,
        wsDisconnect,
      } = wsActions;

      //для создания объекта класса WebSocket:
      if (type === wsInit) {
        socket = new WebSocket(action.payload);
        // dispatch({ type: wsInit });
      }

      // если вебсокет создан, надо подписаться на события
      if (socket) {
        socket.onopen = (event) => {
          dispatch({ type: onOpen });
        };

        socket.onerror = (event) => {
          dispatch({ type: onError });
        };

        socket.onmessage = (event) => {
          const { data } = event;
          const parsedData = JSON.parse(data);
          const { success, ...restParsedData } = parsedData;

          dispatch({ type: onMessage, payload: restParsedData });
        };

        socket.onclose = (event) => {
          dispatch({ type: onClose });
        };

        if (wsSendMessage && type === wsSendMessage) {
          const message = {
            ...payload,
            // token: user.token
          };
          socket.send(JSON.stringify(message));
        }

        // if (wsDisconnect.type === action.type) {
        //   socket.close();
        //   socket = null;
        // }
      }

      next(action);
    };
  };
};
