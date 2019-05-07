import axios from "axios";

import { GET_DEPT } from "./types";

export const getDepartments = () => dispatch => {
  axios
    .get("http://localhost:172/api/depts")
    .then(
      res =>
        console.log(res.data) +
        dispatch({
          type: GET_DEPT,
          payload: res.data
        })
    )

    .catch(err => {
      console.log("ERROR: GET_DEPT DATA NOT RECEIVED");
    });
};
