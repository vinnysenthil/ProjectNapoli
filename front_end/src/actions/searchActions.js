import { SUBMIT_QUERY } from "./types";
import axios from "axios";

// do get request at routes/product.js with newQuery object
export const submitQuery = newQuery => dispatch => {
  axios
    .get("/api/search", { params: newQuery })
    // if success then res.data will be the product object we looking for
    .then(res => {
      dispatch({
        type: SUBMIT_QUERY,
        payload: res.data
      });
    })
    .catch(err => console.log(err));
};
