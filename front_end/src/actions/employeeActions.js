import axios from "axios";

import {
  GET_EMPLOYEE,
  CHECK_EMPLOYEE,
  GET_SOME_EMPLOYEE,
  FIRE_EMPLOYEE
} from "./types";

// Checks employee status, gets employeeID and manager-boolean in return
export const checkCurrentEmployee = employeeName => dispatch => {
  axios
    .get(`http://localhost:172/api/employees/check/${employeeName}`)
    .then(res =>
      dispatch({
        type: CHECK_EMPLOYEE,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: CHECK_EMPLOYEE,
        payload: {}
      })
    );
};

// Get current profile
export const getCurrentEmployee = employeeID => dispatch => {
  axios
    .get(`http://localhost:172/api/employees/${employeeID}`)
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

// Get current profile
export const getSomeEmployee = employeeID => dispatch => {
  axios
    .get(`http://localhost:172/api/employees/${employeeID}`)
    .then(res =>
      dispatch({
        type: GET_SOME_EMPLOYEE,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_SOME_EMPLOYEE,
        payload: {}
      })
    );
};

// Fire an employee
export const fireEmployee = employeeID => dispatch => {
  axios
    .post(`http://localhost:172/api/employees/fire/${employeeID}`)
    .then(res =>
      dispatch({
        type: FIRE_EMPLOYEE,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: FIRE_EMPLOYEE,
        payload: {}
      })
    );
};
