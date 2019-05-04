import { GET_EMPLOYEE } from "../actions/types";

const initialState = {
  employeeData: {
    emp_no: 100345,
    birth_date: "1961-09-16",
    first_name: "Genevieve",
    last_name: "Zambonelli",
    gender: "F",
    hire_date: "1989-04-14",
    curr_salary: 140000,
    curr_dept: "Engineering",
    curr_title: "Staff Software Engineer",
    salaries: [
      {
        salary: 40000,
        from_date: "1993-03-28",
        to_date: "1994-03-28"
      },
      {
        salary: 43002,
        from_date: "1994-03-28",
        to_date: "1995-03-28"
      },
      {
        salary: 46934,
        from_date: "1995-03-28",
        to_date: "1996-03-27"
      },
      {
        salary: 48890,
        from_date: "1996-03-27",
        to_date: "1997-03-27"
      },
      {
        salary: 53057,
        from_date: "1997-03-27",
        to_date: "1998-03-27"
      },
      {
        salary: 54838,
        from_date: "1998-03-27",
        to_date: "1999-03-27"
      },
      {
        salary: 56608,
        from_date: "1999-03-27",
        to_date: "2000-03-26"
      },
      {
        salary: 60711,
        from_date: "2000-03-26",
        to_date: "2001-03-26"
      },
      {
        salary: 60404,
        from_date: "2001-03-26",
        to_date: "2002-03-26"
      },
      {
        salary: 63501,
        from_date: "2002-03-26",
        to_date: "9999-01-01"
      }
    ],
    titles: [
      {
        title: "Senior Staff",
        from_date: "2000-03-28",
        to_date: "9999-01-01"
      },
      {
        title: "Staff",
        from_date: "1993-03-28",
        to_date: "2000-03-28"
      }
    ]
  }
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_EMPLOYEE:
      return {
        ...state,
        employeeData: action.payload
      };

    default:
      return state;
  }
}
