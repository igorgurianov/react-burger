import { placeOrder } from "../../utils/api";
export const GET_ORDER_SUCCESS = "GET_ORDER_SUCCESS";
export const CLOSE_ORDER_INFO = "CLOSE_ORDER_INFO";

export function getOrder(ingridients) {
  return function (dispatch) {
    placeOrder(ingridients).then((res) => {
      dispatch({
        type: GET_ORDER_SUCCESS,
        payload: res.order.number,
      });
    });
  };
}
