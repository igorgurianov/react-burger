import { GET_INGRIDIENT_DETAILS } from "../actions/details";
import { REMOVE_INGRIDIENT_DETAILS } from "../actions/details";

import { TIngredientDetailsActions } from "../actions/details";

export const detailsReducer = (
  state = {},
  action: TIngredientDetailsActions
) => {
  switch (action.type) {
    case GET_INGRIDIENT_DETAILS:
      return {
        state: action.payload,
      };
    case REMOVE_INGRIDIENT_DETAILS:
      return {
        state: null,
      };
    default:
      return state;
  }
};
