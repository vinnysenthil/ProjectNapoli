import axios from "axios";

import { GET_EMPLOYEE } from "./types";

// Get current profile
export const getCurrentEmployee = () => dispatch => {
  // dispatch(setProfileLoading());
  axios
    .get("/api/employee") ////============================== NEEDS TO BE CHANGED
    .then(res =>
      dispatch({
        type: GET_EMPLOYEE,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_EMPLOYEE,
        payload: {}
      })
    );
};
