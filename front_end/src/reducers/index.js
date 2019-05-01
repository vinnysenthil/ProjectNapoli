import { combineReducers } from "redux";
import queryReducer from "./queryReducer";
import overviewReducer from "./overviewReducer";

export default combineReducers({
  query: queryReducer,
  overview: overviewReducer
});
