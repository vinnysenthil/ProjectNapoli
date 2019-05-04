import { GET_DEPT } from "../actions/types";

const initialState = {
  departments: "testDepartment"
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_DEPT:
      return {
        ...state,
        departments: action.payload
      };

    default:
      return state;
  }
}
