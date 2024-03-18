import { api } from "../../utils/api";
import { AppDispatch } from "../types";
import { TOrder, TOrderInfoResponse } from "../types/data";
import { IOrderData } from "../types/data";
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

export const orderDetailsFailedAction = (): IOrderDetailsFailed => ({
  type: ORDER_DETAILS_FAILED,
});
export const orderDetailsRemoveAction = (): IOrderDetailsRemove => ({
  type: ORDER_DETAILS_REMOVE,
});

export const orderDetailsRequestAction = (): IOrderDetailsRequest => ({
  type: ORDER_DETAILS_REQUEST,
});

export const orderDetailsSuccessAction = (
  payload: TOrderInfoResponse
): IOrderDetailsSuccess => ({
  type: ORDER_DETAILS_SUCCESS,
  payload,
});

export interface IOrderDetailsSuccess {
  readonly type: typeof ORDER_DETAILS_SUCCESS;
  readonly payload: any;
}

export function getOrderInfo(order: string) {
  return function (dispatch: AppDispatch) {
    dispatch(orderDetailsRequestAction());
    api
      .getOrderInfo(order)

      .then((res) => {
        //console.log(res);
        //console.log(res.orders[0]);
        dispatch(orderDetailsSuccessAction(res));
      })

      .catch(() => {
        dispatch(orderDetailsFailedAction());
      });
  };
}
