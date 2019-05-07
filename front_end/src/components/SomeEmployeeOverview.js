import { Button, Header } from "semantic-ui-react";
import { checkAuthentication } from "../helpers";
import PropTypes from "prop-types";
import { fireEmployee } from "../actions/employeeActions";

import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { withAuth } from "@okta/okta-react";
import Table from "@material-ui/core/Table";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import TableBody from "@material-ui/core/TableBody";

/// ACTION FOR FIRING EMPLOYEE

let id = 0;
function createData(firstCol, secondCol) {
  id += firstCol + 1;
  return { id, firstCol, secondCol };
}

class SomeEmployeeOverview extends Component {
  constructor(props) {
    super(props);
    this.state = { authenticated: null, userinfo: null };
    this.checkAuthentication = checkAuthentication.bind(this);
    this.onclickFire = this.onclickFire.bind(this);
  }

  async componentDidMount() {
    this.checkAuthentication();
  }

  async componentDidUpdate() {
    this.checkAuthentication();
  }

  onclickFire() {
    this.props.fireEmployee(this.props.employee.someEmployeeData.emp_no);
    this.props.history.push("/employeeOverview");
  }

  render() {
    const { someEmployeeData, employeeCheck } = this.props.employee;

    let EmployeeDataRows = [];

    if (someEmployeeData && someEmployeeData.curr_salary)
      EmployeeDataRows = [
        createData(
          "Status:",
          someEmployeeData.fired ? "Former Employee" : "Current Employee"
        ),
        createData("Employee ID:", someEmployeeData.emp_no),
        createData("DOB:", someEmployeeData.birth_date),
        createData("Firstname:", someEmployeeData.first_name),
        createData("Lastname:", someEmployeeData.last_name),
        createData("Gender:", someEmployeeData.gender),
        createData("Hire Date:", someEmployeeData.hire_date),
        createData(
          "Salary:",
          "$ " +
            someEmployeeData.curr_salary
              .toFixed(2)
              .replace(/\d(?=(\d{3})+\.)/g, "$&,")
        ),
        createData("Department:", someEmployeeData.curr_dept),
        createData("Title:", someEmployeeData.curr_title)
      ];

    return (
      <div>
        {this.state.authenticated !== null && (
          <div>
            {this.state.authenticated && (
              <div>
                {employeeCheck &&
                employeeCheck.manager &&
                !someEmployeeData.fired ? (
                  <Button
                    id="login-button"
                    secondary
                    onClick={this.onclickFire}
                  >
                    Fire Employee
                  </Button>
                ) : null}
                <br /> <br />
                <div
                  style={{
                    color: "white",
                    paddingLeft: 10,
                    background:
                      "linear-gradient(to right, #0c4b78, #3d4e96, #2c76a9)"
                  }}
                >
                  EMPLOYEE DATA
                </div>
                <Table>
                  <TableBody>
                    {EmployeeDataRows.map(row => (
                      <TableRow
                        key={row.id}
                        style={{
                          padding: 0
                        }}
                      >
                        <TableCell
                          align="left"
                          style={{
                            paddingLeft: 5,
                            paddingRight: 5,
                            width: 150
                          }}
                        >
                          {row.firstCol}
                        </TableCell>
                        <TableCell align="left" style={{ padding: 0 }}>
                          {row.secondCol}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                <br />
              </div>
            )}
          </div>
        )}
      </div>
    );
  }
}

SomeEmployeeOverview.PropTypes = {
  //   getCurrentEmployee: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  overview: state.overview,
  employee: state.employee
});

export default connect(
  mapStateToProps,
  { fireEmployee }
)(withAuth(SomeEmployeeOverview));
