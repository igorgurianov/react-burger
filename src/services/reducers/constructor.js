import { ADD_ITEM } from "../actions/constructor";
import {
  ADD_BUN,
  ADD_FILLING,
  REMOVE_FILLING,
  ORDER_INGRIDIENTS,
} from "../actions/constructor";

const initialState = {
  selectedBun: null,
  selectedFillings: [],
  totalPrice: 0,
  orderedIngridients: [],
};

export const constructorReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_BUN:
      return {
        ...state,
        selectedBun: action.payload,
      };
    case ADD_FILLING:
      return {
        ...state,
        selectedFillings: [...state.selectedFillings, action.payload],
      };
    case REMOVE_FILLING:
      return {
        ...state,
        selectedFillings: [
          ...state.selectedFillings.filter(
            (item) => item.uniqueId !== action.payload
          ),
        ],
      };
    case ORDER_INGRIDIENTS: {
      const { dragIndex, hoverIndex } = action.payload;
      const newFillings = [...state.selectedFillings];
      const draggedItem = newFillings[dragIndex];

      // Remove the dragged item from the original position
      newFillings.splice(dragIndex, 1);

      // Insert the dragged item at the new position
      newFillings.splice(hoverIndex, 0, draggedItem);

      return {
        ...state,
        selectedFillings: newFillings,
      };
    }

    default:
      return state;
  }
};

// const existingFillings = state.selectedFillings.find(
//   (item) => item._id === action.payload._id
// );
// if (existingFillings) {
//   const updatedFillings = state.selectedFillings.map((item) =>
//     item._id === action.payload._id
//       ? { ...item, qty: item.qty + 1 }
//       : item
//   );
//   return {
//     ...state,
//     selectedFillings: updatedFillings,
//   };
// } else {
//   // If the filling is new, add it to the selectedFillings array with qty = 1
//   return {
//     ...state,
//     selectedFillings: [
//       ...state.selectedFillings,
//       { ...action.payload, qty: 1 },
//     ],
//   };
// }
