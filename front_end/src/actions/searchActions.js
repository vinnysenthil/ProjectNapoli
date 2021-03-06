import { SUBMIT_QUERY, SAVE_QUERY } from "./types";
import axios from "axios";

// do get request at routes/product.js with newQuery object
export const submitQuery = newQuery => dispatch => {
  let deptSearch = newQuery.dept ? "&dept=" + newQuery.dept : "";
  let pageSearch = newQuery.page ? "&page=" + newQuery.page : "";

  axios
    .get(
      `/api/employees/search?query=${
        newQuery.query
      }${deptSearch}${pageSearch}`
    )

    // if success then res.data will be the product object we looking for
    .then(res => {
      dispatch({
        type: SUBMIT_QUERY,
        payload: res.data
      });
    })
    .catch(err => console.log(err));
};

export const saveQuery = newQuery => dispatch => {
  dispatch({
    type: SAVE_QUERY,
    payload: newQuery
  });
};
