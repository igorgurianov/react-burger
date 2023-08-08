import { placeOrder } from "../../utils/api";
export const GET_ORDER_SUCCESS = "GET_ORDER_SUCCESS";
export const GET_ORDER_FAILED = "GET_ORDER_FAILED";
export const GET_ORDER_REQUEST = "GET_ORDER_REQUEST";
export const CLOSE_ORDER_INFO = "CLOSE_ORDER_INFO";

export function getOrder(ingridients) {
  return function (dispatch) {
    dispatch({ type: GET_ORDER_REQUEST });

    placeOrder(ingridients)
      .then((res) => {
        if (res && res.success) {
          dispatch({
            type: GET_ORDER_SUCCESS,
            payload: res.order.number,
          });
        } else {
          dispatch({
            type: GET_ORDER_FAILED,
          });
        }
      })
      .catch((res) => {
        dispatch({ type: GET_ORDER_FAILED });
      });
  };
}
