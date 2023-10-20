export type TIngridientTypes = {
  bun: string;
  main: string;
  sauce: string;
};

export type TIngredient = {
  _id: string;
  name: string;
  type: "bun" | "main" | "sause";
  proteins: number;
  fat: number;
  carbohydrates: number;
  calories: number;
  price: number;
  image: string;
  image_mobile: string;
  image_large: string;
  __v: number | string;
  uniqueId?: string;
  count?: number;
};

export type TOnOpenFunction = (data: TIngredient) => void;

export type TModalRoot = HTMLElement;

export type TOrder = {
  readonly _id?: string;
  readonly name: string;
  readonly number: string;
  readonly createdAt: string;
  readonly updatedAt: string;
  readonly ingredients: string[];
  readonly status: "created" | "done" | "pending";
  readonly path: string;
};

export interface IRegisterUser {
  name?: string;
  email?: string;
  password?: string;
  token?: string;
}

export interface IForgotPassword {
  email?: string;
}

export interface ILogin {
  email?: string;
  password?: string;
}
