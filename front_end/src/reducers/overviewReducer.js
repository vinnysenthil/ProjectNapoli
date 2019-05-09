import { GET_DEPT, CLEAR_DEPT } from "../actions/types";

const initialState = {
  departments: null
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_DEPT:
      return {
        ...state,
        departments: action.payload
      };
    case CLEAR_DEPT:
      return {
        ...state,
        departments: null
      };
    default:
      return state;
  }
}
