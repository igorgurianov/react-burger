import { TIngredient } from "../types/data";
import { v4 as uuidv4 } from "uuid";
export const ADD_FILLING: "ADD_FILLING" = "ADD_FILLING";
export const ADD_BUN: "ADD_BUN" = "ADD_BUN";
export const REMOVE_FILLING: "REMOVE_FILLING" = "REMOVE_FILLING";
export const ORDER_INGRIDIENTS: "ORDER_INGRIDIENTS" = "ORDER_INGRIDIENTS";
export const ADD_INGRIDIENT: "ADD_INGRIDIENT" = "ADD_INGRIDIENT";
export const RESET_CONSTRUCTOR: "RESET_CONSTRUCTOR" = "RESET_CONSTRUCTOR";

export interface IAddFilling {
  readonly type: typeof ADD_FILLING;
}

export interface IAddBun {
  readonly type: typeof ADD_BUN;
}

export interface IRemoveFilling {
  readonly type: typeof REMOVE_FILLING;
  readonly payload: string;
}

export interface IOrderIngredients {
  readonly type: typeof ORDER_INGRIDIENTS;
  readonly payload: { dragIndex: number; hoverIndex: number };
}

export interface IAddIngridient {
  readonly type: typeof ADD_INGRIDIENT;
  readonly payload: TIngredient & { uniqueId: string };
}

export interface IResetConstructor {
  readonly type: typeof RESET_CONSTRUCTOR;
}

export type TConstructorActions =
  | IAddFilling
  | IAddBun
  | IRemoveFilling
  | IOrderIngredients
  | IAddIngridient
  | IResetConstructor;

//action creator
export const addIngridient = (item: TIngredient): IAddIngridient => {
  return {
    type: ADD_INGRIDIENT,
    payload: {
      ...item,
      uniqueId: uuidv4(),
    },
  };
};

export const removeIngridient = (item: string): IRemoveFilling => {
  return {
    type: REMOVE_FILLING,
    payload: item,
  };
};
