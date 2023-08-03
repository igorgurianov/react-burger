import { GET_ORDER_SUCCESS, CLOSE_ORDER_INFO } from "../actions/order";

const initialState = {
  isOpen: false,
  order: "",
};

export const orderReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ORDER_SUCCESS:
      return {
        ...state,
        isOpen: true,
        order: action.payload,
      };
    case CLOSE_ORDER_INFO:
      return {
        ...state,
        isOpen: false,
        order: "",
      };

    default:
      return state;
  }
};
