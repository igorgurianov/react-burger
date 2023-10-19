export type TIngredient = {
  _id: string;
  name: string;
  type: string;
  proteins: number;
  fat: number;
  carbohydrates: number;
  calories: number;
  price: number;
  image: string;
  image_mobile: string;
  image_large: string;
  __v: number;
};

export type TOnOpenFunction = (data: TIngredient) => void;

export type TModalRoot = HTMLElement;

export type TOrder = {
  _id?: string;
  name: string;
  number: string;
  createdAt: string;
  ingredients: string[];
  status: string;
  path: string;
};

export interface IRegisterUser {
  name: string;
  email: string;
  pass: string;
  password?: string;
  token?: string;
}
