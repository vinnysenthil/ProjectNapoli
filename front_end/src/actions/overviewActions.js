import axios from "axios";

import { GET_DEPT } from "./types";

export const getDepartments = () => dispatch => {
  axios
    .get("/index/dept/")
    .then(res =>
      dispatch({
        type: GET_DEPT,
        payload: res.data
      })
    )
    .catch(err => {
      console.log("ERROR: GET_DEPT DATA NOT RECEIVED");
    });
};
