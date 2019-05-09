import { GET_DEPT } from "../actions/types";

const initialState = {
  departments: {
    deptName: "-",
    male: 0.5,
    female: 0.5,
    avgMaleSalary: 10000.0,
    avgFemaleSalary: 10000.0,
    shareOfCompanyCost: 0.5,
    totalEmployees: 10000
  }
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
