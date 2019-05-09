import axios from "axios";

import { GET_DEPT, CLEAR_DEPT } from "./types";

export const getDepartments = deptID => dispatch => {
  axios
    .get(`/api/departments/${deptID}`)
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

export const clearDepartment = () => {
  return {
    type: CLEAR_DEPT
  };
};
