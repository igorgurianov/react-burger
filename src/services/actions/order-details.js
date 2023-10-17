import { api } from "../../utils/api";
export const ORDER_DETAILS_REQUEST = "ORDER_DETAILS_REQUEST";
export const ORDER_DETAILS_SUCCESS = "ORDER_DETAILS_SUCCESS";
export const ORDER_DETAILS_FAILED = "ORDER_DETAILS_FAILED";
export const ORDER_DETAILS_REMOVE = "ORDER_DETAILS_REMOVE";

export function getOrderInfo(order) {
  return function (dispatch) {
    dispatch({ type: ORDER_DETAILS_REQUEST });
    api
      .getOrderInfo(order)
      .then((res) =>
        dispatch({
          type: ORDER_DETAILS_SUCCESS,
          payload: res.orders[0],
        })
      )

      .catch((err) => {
        dispatch({
          type: ORDER_DETAILS_FAILED,
        });
      });
  };
}
