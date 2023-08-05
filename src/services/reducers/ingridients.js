import {
  GET_ITEMS_SUCCESS,
  GET_ITEMS_FAILED,
  GET_ITEMS_REQUEST,
} from "../actions";

const initialState = {
  allItems: [],
  itemsRequest: false,
  itemsFailed: false,
};

export const ingridientsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ITEMS_REQUEST:
      return {
        ...state,
        itemsRequest: true,
      };
    case GET_ITEMS_FAILED:
      return {
        ...state,
        itemsRequest: false,
        itemsFailed: true,
      };
    case GET_ITEMS_SUCCESS:
      return {
        ...state,
        allItems: action.payload,
      };
    default:
      return state;
  }
};
