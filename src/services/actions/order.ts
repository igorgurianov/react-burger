import { api } from "../../utils/api";
import { AppDispatch } from "../types";
import { TOrder } from "../types/data";
export const GET_ORDER_SUCCESS: "GET_ORDER_SUCCESS" = "GET_ORDER_SUCCESS";
export const GET_ORDER_FAILED: "GET_ORDER_FAILED" = "GET_ORDER_FAILED";
export const GET_ORDER_REQUEST: "GET_ORDER_REQUEST" = "GET_ORDER_REQUEST";
export const CLOSE_ORDER_INFO: "CLOSE_ORDER_INFO" = "CLOSE_ORDER_INFO";

export interface IGetOrderSuccess {
  readonly type: typeof GET_ORDER_SUCCESS;
  // readonly payload: TOrder;
  readonly payload: number;
}

export interface IGetOrderFailed {
  readonly type: typeof GET_ORDER_FAILED;
}
export interface IGetOrderRequest {
  readonly type: typeof GET_ORDER_REQUEST;
}
export interface IGetOrderInfo {
  readonly type: typeof CLOSE_ORDER_INFO;
}

export type TOrderActions =
  | IGetOrderSuccess
  | IGetOrderFailed
  | IGetOrderRequest
  | IGetOrderInfo;

export const getOrderRequestAction = () => ({
  type: GET_ORDER_REQUEST,
});

export const getOrderSuccessAction = (number: number): IGetOrderSuccess => ({
  type: GET_ORDER_SUCCESS,
  payload: number,
});

export function getOrder(ingridients: string[]) {
  return function (dispatch: AppDispatch) {
    dispatch(getOrderRequestAction());
    api
      .placeOrder(ingridients)
      .then((res) => {
        dispatch(getOrderSuccessAction(res.order.number));
      })
      .catch((res) => {
        dispatch({ type: GET_ORDER_FAILED });
      });
  };
}
