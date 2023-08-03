import { ADD_ITEM } from "../actions/constructor";
import { ADD_BUN, ADD_FILLING } from "../actions/constructor";

const initialState = {
  selectedBun: {},
  selectedFillings: null,
};

export const constructorReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_BUN:
      return {
        ...state,
        selectedBun: action.payload,
      };
    case ADD_FILLING:
      console.log(action.payload);
      debugger;
      return {
        ...state,
        selectedFillings: [...state.selectedFillings, action.payload],

        // selectedFillings: [...(state?.selectedFillings || []), action.payload],
        // selectedFillings: [
        //   ...state.selectedFillings.map((item) =>
        //     item._id === action.payload._id
        //       ? { ...item, qty: ++item.qty }
        //       : item
        //   ),
        //   action.payload,
        // ],
      };

    default:
      return state;
  }
};
