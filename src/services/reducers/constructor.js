import {
  REMOVE_FILLING,
  ORDER_INGRIDIENTS,
  ADD_INGRIDIENT,
  RESET_CONSTRUCTOR,
} from "../actions/constructor";
import { v4 as uuidv4 } from "uuid";
import ingridientTypes from "../../utils/constants";

const initialState = {
  selectedBun: null,
  selectedFillings: [],
  totalPrice: 0,
  orderedIngridients: [],
};

export const constructorReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_INGRIDIENT:
      const uniqueId = uuidv4();
      if (action.payload.type === ingridientTypes.bun) {
        return {
          ...state,
          selectedBun: { ...action.payload, uniqueId },
        };
      } else {
        return {
          ...state,
          selectedFillings: [
            ...state.selectedFillings,
            { ...action.payload, uniqueId },
          ],
        };
      }

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

    case RESET_CONSTRUCTOR: {
      return { ...initialState };
    }

    default:
      return state;
  }
};
