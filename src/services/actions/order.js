import { api } from "../../utils/api";
export const GET_ORDER_SUCCESS = "GET_ORDER_SUCCESS";
export const GET_ORDER_FAILED = "GET_ORDER_FAILED";
export const GET_ORDER_REQUEST = "GET_ORDER_REQUEST";
export const CLOSE_ORDER_INFO = "CLOSE_ORDER_INFO";

export function getOrder(ingridients) {
  return function (dispatch) {
    dispatch({ type: GET_ORDER_REQUEST });

    api
      .placeOrder(ingridients)
      .then((res) => {
        dispatch({
          type: GET_ORDER_SUCCESS,
          payload: res.order.number,
        });
      })
      .catch((res) => {
        dispatch({ type: GET_ORDER_FAILED });
      });
  };
}
