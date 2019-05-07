import { SUBMIT_QUERY, SAVE_QUERY } from "../actions/types";

const initialState = {
  searchQuery: null, // the search arguments
  searchArgument: null
};

// ...state = current state
export default function(state = initialState, action) {
  switch (action.type) {
    case SUBMIT_QUERY:
      return {
        ...state,
        searchQuery: action.payload
        // loading: false
      };
    case SAVE_QUERY:
      return {
        ...state,
        searchArgument: action.payload
        // loading: false
      };
    default:
      return state;
  }
}
