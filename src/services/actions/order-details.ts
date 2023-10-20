import { api } from "../../utils/api";
import { AppDispatch } from "../types";
export const ORDER_DETAILS_REQUEST: "ORDER_DETAILS_REQUEST" =
  "ORDER_DETAILS_REQUEST";
export const ORDER_DETAILS_SUCCESS: "ORDER_DETAILS_SUCCESS" =
  "ORDER_DETAILS_SUCCESS";
export const ORDER_DETAILS_FAILED: "ORDER_DETAILS_FAILED" =
  "ORDER_DETAILS_FAILED";
export const ORDER_DETAILS_REMOVE: "ORDER_DETAILS_REMOVE" =
  "ORDER_DETAILS_REMOVE";

export interface IOrderDetailsRequest {
  readonly type: typeof ORDER_DETAILS_REQUEST;
}
export interface IOrderDetailsSuccess {
  readonly type: typeof ORDER_DETAILS_SUCCESS;
  readonly payload: any;
}
export interface IOrderDetailsFailed {
  readonly type: typeof ORDER_DETAILS_FAILED;
}
export interface IOrderDetailsRemove {
  readonly type: typeof ORDER_DETAILS_REMOVE;
}

export type TOrderDetailsActions =
  | IOrderDetailsRequest
  | IOrderDetailsSuccess
  | IOrderDetailsFailed
  | IOrderDetailsRemove;

//action creators
export const orderDetailsRequestAction = (): IOrderDetailsRequest => ({
  type: ORDER_DETAILS_REQUEST,
});

export const orderDetailsSuccessAction = (
  payload: any
): IOrderDetailsSuccess => ({
  type: ORDER_DETAILS_SUCCESS,
  payload,
});
export const orderDetailsFailedAction = (): IOrderDetailsFailed => ({
  type: ORDER_DETAILS_FAILED,
});
export const orderDetailsRemoveAction = (): IOrderDetailsRemove => ({
  type: ORDER_DETAILS_REMOVE,
});

export function getOrderInfo(order: any) {
  return function (dispatch: AppDispatch) {
    dispatch(orderDetailsRequestAction());
    api
      .getOrderInfo(order)

      .then((res) => dispatch(orderDetailsSuccessAction(res.orders[0])))

      .catch(() => {
        dispatch(orderDetailsFailedAction());
      });
  };
}
