import { api } from "../../utils/api";
import { IRegisterUser } from "../types/data";

export const REGISTER_USER_REQUEST: "REGISTER_USER_REQUEST" =
  "REGISTER_USER_REQUEST";
export const REGISTER_USER_SUCCESS: "REGISTER_USER_SUCCESS" =
  "REGISTER_USER_SUCCESS";
export const REGISTER_USER_FAILED: "REGISTER_USER_FAILED" =
  "REGISTER_USER_FAILED";

export const LOGIN_USER_FAILED: "LOGIN_USER_FAILED" = "LOGIN_USER_FAILED";
export const LOGIN_USER_REQUEST: "LOGIN_USER_REQUEST" = "LOGIN_USER_REQUEST";
export const LOGIN_USER_SUCCESS: "LOGIN_USER_SUCCESS" = "LOGIN_USER_SUCCESS";

export const SET_USER_SUCCESS: "SET_USER_SUCCESS" = "SET_USER_SUCCESS";
export const SET_USER_FAILED: "SET_USER_FAILED" = "SET_USER_FAILED";

export const FORGOT_PASSWORD: "FORGOT_PASSWORD" = "FORGOT_PASSWORD";
export const RESET_PASSWORD: "RESET_PASSWORD" = "RESET_PASSWORD";

export interface IRegisterUserRequest {
  readonly type: typeof REGISTER_USER_REQUEST;
}
export interface IRegisterUserSuccess {
  readonly type: typeof REGISTER_USER_SUCCESS;
  readonly payload: any;
}
export interface IRegisterUserFailed {
  readonly type: typeof REGISTER_USER_FAILED;
}
export interface ILoginUserFailed {
  readonly type: typeof LOGIN_USER_FAILED;
}
export interface ILoginUserRequest {
  readonly type: typeof LOGIN_USER_REQUEST;
}
export interface ILoginUserSuccess {
  readonly type: typeof LOGIN_USER_SUCCESS;
}
export interface ISetUserSuccess {
  readonly type: typeof SET_USER_SUCCESS;
  readonly payload: any;
}
export interface ISetUserFailed {
  readonly type: typeof SET_USER_FAILED;
}

export interface IForgotPassword {
  readonly type: typeof FORGOT_PASSWORD;
}
export interface IResetPassword {
  readonly type: typeof SET_USER_FAILED;
}

export type TUserActions =
  | IRegisterUserRequest
  | IRegisterUserSuccess
  | IRegisterUserFailed
  | ILoginUserFailed
  | ILoginUserRequest
  | ILoginUserSuccess
  | ISetUserSuccess
  | ISetUserFailed;

export function registration({ name, email, pass }: IRegisterUser) {
  return function (dispatch: any) {
    dispatch({ type: REGISTER_USER_REQUEST });

    api
      .registration(name, email, pass)
      .then((res) => {
        localStorage.setItem("accessToken", res.accessToken);
        localStorage.setItem("refreshToken", res.refreshToken);
        dispatch({
          type: REGISTER_USER_SUCCESS,
          payload: res,
        });
        dispatch({ type: SET_USER_SUCCESS, payload: res });
      })
      .catch((res) => {
        dispatch({ type: REGISTER_USER_FAILED });
      });
  };
}

export function userLogin(email: string, pass: string) {
  return function (dispatch: any) {
    dispatch({ type: LOGIN_USER_REQUEST });
    api
      .login(email, pass)
      .then((res) => {
        localStorage.setItem("accessToken", res.accessToken);
        localStorage.setItem("refreshToken", res.refreshToken);
        dispatch({ type: LOGIN_USER_SUCCESS, payload: res });
        dispatch({ type: SET_USER_SUCCESS, payload: res });
      })
      .catch((res) => {
        dispatch({ type: REGISTER_USER_FAILED });
      });
  };
}

export function changeInfo(data: any) {
  return function (dispatch: any) {
    api
      .changeUserInfo(data)
      .then((res) => {
        dispatch({ type: SET_USER_SUCCESS, payload: res });
      })
      .catch((res) => dispatch({ type: SET_USER_FAILED }));
  };
}

export function checkUserAuth() {
  return function (dispatch: any) {
    api
      .getUser()
      .then((res) => {
        dispatch({ type: SET_USER_SUCCESS, payload: res });
      })
      .catch((res) => dispatch({ type: SET_USER_FAILED }));
  };
}

export function logout() {
  return function (dispatch: any) {
    api
      .logout()
      .then((res) => {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        dispatch({ type: SET_USER_SUCCESS, payload: null });
      })
      .catch((res) => dispatch({ type: SET_USER_FAILED }));
  };
}
