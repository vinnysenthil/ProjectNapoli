import {
  GET_EMPLOYEE,
  CHECK_EMPLOYEE,
  GET_SOME_EMPLOYEE
} from "../actions/types";

const initialState = {
  employeeCheck: null,
  someEmployeeData: null,
  employeeData: {
    salaries: [
      {
        salary: 999,
        from_date: "Please",
        to_date: "Reload Page"
      }
    ],
    titles: [
      {
        title: "Please",
        from_date: "Reload",
        to_date: "Page"
      }
    ]
  }
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_EMPLOYEE:
      return {
        ...state,
        employeeData: action.payload
      };
    case CHECK_EMPLOYEE:
      return {
        ...state,
        employeeCheck: action.payload
      };
    case GET_SOME_EMPLOYEE:
      return {
        ...state,
        someEmployeeData: action.payload
      };
    default:
      return state;
  }
}
