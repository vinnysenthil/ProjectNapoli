import { combineReducers } from "redux";
import queryReducer from "./queryReducer";
import overviewReducer from "./overviewReducer";
import employeeReducer from "./employeeReducer";

export default combineReducers({
  query: queryReducer,
  overview: overviewReducer,
  employee: employeeReducer
});
