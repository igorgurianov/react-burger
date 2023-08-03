import { ADD_TASK, DELETE_TASK } from "../actions";
import { GET_ITEMS_SUCCESS } from "../actions";

const initialState = {
  allItems: [],
};

export const ingridientsReducer = (state = initialState, action) => {
  switch (action.type) {
    // case ADD_TASK:
    //   return {
    //     ...state,
    //     task: [...state.task, action.payload],
    //   };
    // case DELETE_TASK:
    //   return {
    //     ...state,
    //     task: [...state.task.filter((task) => task.id !== action.payload)],
    //   };
    case GET_ITEMS_SUCCESS:
      return {
        ...state,
        allItems: action.payload,
      };
    default:
      return state;
  }
};
