import { TIngredient } from "../types/data";

export const GET_INGRIDIENT_DETAILS: "GET_INGRIDIENT_DETAILS" =
  "GET_INGRIDIENT_DETAILS";
export const REMOVE_INGRIDIENT_DETAILS: "REMOVE_INGRIDIENT_DETAILS" =
  "REMOVE_INGRIDIENT_DETAILS";

export interface IGetIngridientDetails {
  readonly type: typeof GET_INGRIDIENT_DETAILS;
  readonly payload: TIngredient;
}

export interface IRemoveIngridientDetails {
  readonly type: typeof REMOVE_INGRIDIENT_DETAILS;
}

export type TIngredientDetailsActions =
  | IGetIngridientDetails
  | IRemoveIngridientDetails;
