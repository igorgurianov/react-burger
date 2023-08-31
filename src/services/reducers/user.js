import {
  REGISTER_USER_FAILED,
  REGISTER_USER_REQUEST,
  REGISTER_USER_SUCCESS,
  LOGIN_USER_SUCCESS,
  SET_USER,
} from "../actions/user";

const initialState = {
  user: null,
  registerRequest: false,
  registerFailed: false,
  authChecked: false,
  accessToken: "",
  refreshToken: "",
};

export const userReducer = (state = initialState, action) => {
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

    case SET_USER: {
      if (action.payload) {
        return {
          ...state,
          user: {
            ...state.user,
            email: action.payload.user.email,
            name: action.payload.user.name,
          },
        };
      } else {
        return {
          ...state,
          user: null,
        };
      }
    }

    default:
      return state;
  }
};
