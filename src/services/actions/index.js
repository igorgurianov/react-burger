import { api } from "../../utils/api";

export const ADD_TASK = "ADD_TASK";
export const DELETE_TASK = "DELETE_TASK";

export const GET_ITEMS_REQUEST = "GET_ITEMS_REQUEST";
export const GET_ITEMS_SUCCESS = "GET_ITEMS_SUCCESS";
export const GET_ITEMS_FAILED = "GET_ITEMS_FAILED";

export function getItems() {
  return function (dispatch) {
    api().then((res) => {
      dispatch({
        type: GET_ITEMS_SUCCESS,
        payload: res.data,
      });
    });
  };
}
