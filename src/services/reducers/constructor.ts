import {
  REMOVE_FILLING,
  ORDER_INGRIDIENTS,
  ADD_INGRIDIENT,
  RESET_CONSTRUCTOR,
} from "../actions/constructor";
import ingridientTypes from "../../utils/constants";
import { TConstructorActions } from "../actions/constructor";
import { TIngredient } from "../types/data";

export type TConstructorState = {
  selectedBun?: any;
  selectedFillings: TIngredient[];
  totalPrice: number;
  orderedIngridients?: any;
};

const initialState = {
  selectedBun: null,
  selectedFillings: [],
  totalPrice: 0,
  orderedIngridients: [],
};

export const constructorReducer = (
  state: TConstructorState = initialState,
  action: TConstructorActions
) => {
  switch (action.type) {
    case ADD_INGRIDIENT:
      if (action.payload.type === ingridientTypes.bun) {
        return {
          ...state,
          selectedBun: { ...action.payload },
        };
      } else {
        return {
          ...state,
          selectedFillings: [...state.selectedFillings, { ...action.payload }],
        };
      }

    case REMOVE_FILLING:
      return {
        ...state,
        selectedFillings: [
          ...state.selectedFillings.filter(
            (item: any) => item.uniqueId !== action.payload
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
