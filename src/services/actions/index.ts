import { api } from "../../utils/api";
import { TIngredient } from "../types/data";
export const GET_ITEMS_REQUEST: "GET_ITEMS_REQUEST" = "GET_ITEMS_REQUEST";
export const GET_ITEMS_SUCCESS: "GET_ITEMS_SUCCESS" = "GET_ITEMS_SUCCESS";
export const GET_ITEMS_FAILED: "GET_ITEMS_FAILED" = "GET_ITEMS_FAILED";

export interface IGetItemsRequest {
  readonly type: typeof GET_ITEMS_REQUEST;
}

export interface IGetItemsSuccess {
  readonly type: typeof GET_ITEMS_SUCCESS;
  readonly payload: any;
}

export interface IGetItemsFailed {
  readonly type: typeof GET_ITEMS_FAILED;
}

export type TIngridientsActions =
  | IGetItemsRequest
  | IGetItemsSuccess
  | IGetItemsFailed;

//action creators
export const getItemsAction = (): IGetItemsRequest => ({
  type: GET_ITEMS_REQUEST,
});

export const getItemsFailedAction = (): IGetItemsFailed => ({
  type: GET_ITEMS_FAILED,
});

export const getItemsSuccessAction = (
  payload: ReadonlyArray<TIngredient>
): IGetItemsSuccess => ({
  type: GET_ITEMS_SUCCESS,
  payload,
});

export function getItems() {
  return function (dispatch: any) {
    dispatch(getItemsAction());
    api
      .getIngredients()
      .then((res) => dispatch(getItemsSuccessAction(res.data)))

      .catch((err) => {
        dispatch(getItemsFailedAction());
      });
  };
}
