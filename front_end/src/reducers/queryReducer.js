import { SUBMIT_QUERY } from "../actions/types";

const initialState = {
  searchQuery: null // the search arguments
};

// ...state = current state
export default function(state = initialState, action) {
  switch (action.type) {
    case SUBMIT_QUERY:
      return {
        ...state,
        searchQuery: action.payload,
        loading: false
      };

    default:
      return state;
  }
}
