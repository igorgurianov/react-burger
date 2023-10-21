import {
  REGISTER_USER_FAILED,
  REGISTER_USER_REQUEST,
  REGISTER_USER_SUCCESS,
  LOGIN_USER_SUCCESS,
  SET_USER_SUCCESS,
  SET_USER_FAILED,
  SET_USER_LOGOUT,
} from "../actions/user";
import { TUser } from "../types/data";

import { TUserActions } from "../actions/user";

export type TUserState = {
  user: TUser | null;
  setUserFailed: boolean;
  registerRequest: boolean;
  registerFailed: boolean;
  authChecked: boolean;
  accessToken: string;
  refreshToken: string;
};

const initialState: TUserState = {
  user: null,
  setUserFailed: false,
  registerRequest: false,
  registerFailed: false,
  authChecked: false,
  accessToken: "",
  refreshToken: "",
};

export const userReducer = (
  state: TUserState = initialState,
  action: TUserActions
) => {
  switch (action.type) {
    case REGISTER_USER_SUCCESS:
      return {
        ...state,
        registerRequest: false,
        registerFailed: false,
        authChecked: true,
        accessToken: action.payload.accessToken,
        refreshToken: action.payload.refreshToken,
      };

    case REGISTER_USER_FAILED: {
      return {
        ...state,
        registerFailed: true,
        registerRequest: false,
      };
    }
    case REGISTER_USER_REQUEST: {
      return { ...state, registerRequest: true };
    }

    case LOGIN_USER_SUCCESS: {
      return {
        ...state,
        authChecked: true,
      };
    }

    case SET_USER_SUCCESS: {
      return {
        ...state,
        setUserFailed: false,
        user: {
          ...state.user,
          email: action.payload.user.email,
          name: action.payload.user.name,
        },
      };
    }

    case SET_USER_LOGOUT: {
      return {
        ...state,
        setUserFailed: false,
        user: null,
      };
    }
    case SET_USER_FAILED: {
      return {
        ...state,
        setUserFailed: true,
      };
    }

    default:
      return state;
  }
};
