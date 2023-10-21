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
  uniqueId: string;
  count?: number;
};

export type TOnOpenFunction = (data: TIngredient) => void;

export type TModalRoot = HTMLElement;

export interface IOrderData {
  readonly order: {
    readonly _id: string;
    readonly ingredients: Array<string>;
    readonly status: string;
    readonly name: string;
    readonly createdAt: string | number | Date;
    readonly updatedAt: string;
    readonly number: number;
  };
}

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

export type TWebSocketResponse = {
  orders: Array<TOrder>;
  total: number;
  totalToday: number;
};

export type TUser = {
  createdAt?: string;
  email: string;
  name: string;
  password?: string;
  updatedAt?: string;
};

export type TOrderInfoResponse = {
  success: boolean;
  orders: ReadonlyArray<TOrder>;
};

export interface TOrder {
  readonly _id: string;
  readonly name: string;
  readonly number: number;
  readonly createdAt: string;
  readonly updatedAt: string;
  readonly ingredients: Array<string>;
  readonly status: "created" | "done" | "pending";
  readonly path?: string;
  readonly __v: string;
}
