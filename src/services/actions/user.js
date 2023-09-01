import { api } from "../../utils/api";

export const REGISTER_USER_REQUEST = "REGISTER_USER_REQUEST";
export const REGISTER_USER_SUCCESS = "REGISTER_USER_SUCCESS";
export const REGISTER_USER_FAILED = "REGISTER_USER_FAILED";

export const LOGIN_USER_FAILED = "LOGIN_USER_FAILED";
export const LOGIN_USER_REQUEST = "LOGIN_USER_REQUEST";
export const LOGIN_USER_SUCCESS = "LOGIN_USER_SUCCESS";

export const SET_USER_SUCCESS = "SET_USER";
export const SET_USER_FAILED = "SET_USER";

export const FORGOT_PASSWORD = "FORGOT_PASSWORD";
export const RESET_PASSWORD = "RESET_PASSWORD";

export function registration({ name, email, pass }) {
  return function (dispatch) {
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

export function userLogin(email, pass) {
  return function (dispatch) {
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

export function changeInfo(data) {
  return function (dispatch) {
    api
      .changeUserInfo(data)
      .then((res) => {
        dispatch({ type: SET_USER_SUCCESS, payload: res });
      })
      .catch((res) => dispatch({ type: SET_USER_FAILED }));
  };
}

export function checkUserAuth() {
  return function (dispatch) {
    api
      .getUser()
      .then((res) => {
        dispatch({ type: SET_USER_SUCCESS, payload: res });
      })
      .catch((res) => dispatch({ type: SET_USER_FAILED }));
  };
}

export function logout() {
  return function (dispatch) {
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
