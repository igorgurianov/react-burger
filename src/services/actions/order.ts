import { api } from "../../utils/api";
export const GET_ORDER_SUCCESS: "GET_ORDER_SUCCESS" = "GET_ORDER_SUCCESS";
export const GET_ORDER_FAILED: "GET_ORDER_FAILED" = "GET_ORDER_FAILED";
export const GET_ORDER_REQUEST: "GET_ORDER_REQUEST" = "GET_ORDER_REQUEST";
export const CLOSE_ORDER_INFO: "CLOSE_ORDER_INFO" = "CLOSE_ORDER_INFO";

export interface IGetOrderSuccess {
  readonly type: typeof GET_ORDER_SUCCESS;
  readonly payload: any;
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

export const getOrderSuccessAction = (number: any): IGetOrderSuccess => ({
  type: GET_ORDER_SUCCESS,
  payload: number,
});

export function getOrder(ingridients: string[]) {
  return function (dispatch: any) {
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
