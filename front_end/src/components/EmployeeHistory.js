import { Button, Header } from "semantic-ui-react";
import { checkAuthentication } from "../helpers";
import PropTypes from "prop-types";

import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { withAuth } from "@okta/okta-react";
import Table from "@material-ui/core/Table";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import TableBody from "@material-ui/core/TableBody";

// Actions
import { getCurrentEmployee } from "../actions/employeeActions";

class EmployeeHistory extends Component {
  constructor(props) {
    super(props);
    this.state = { authenticated: null, userinfo: null };
    this.checkAuthentication = checkAuthentication.bind(this);
    this.login = this.login.bind(this);
  }

  async componentDidMount() {
    this.checkAuthentication();
    if (this.props.employee.employeeCheck)
      this.props.getCurrentEmployee(this.props.employee.employeeCheck.id);
  }

  async componentDidUpdate() {
    this.checkAuthentication();
  }

  async login() {
    this.props.auth.login("/");
  }

  render() {
    const { employeeData } = this.props.employee;

    let salaryHistory = null;
    let titleHistory = null;

    if (employeeData != null) {
      salaryHistory = employeeData.salaries.map(row => {
        return (
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
              {row.from_date}
            </TableCell>
            <TableCell align="left" style={{ padding: 0 }}>
              {row.to_date ? row.to_date : "current"}
            </TableCell>
            <TableCell align="left" style={{ padding: 0 }}>
              $ {row.salary.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,")}
            </TableCell>
          </TableRow>
        );
      });

      titleHistory = employeeData.titles.map(row => {
        return (
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
              {row.from_date}
            </TableCell>
            <TableCell align="left" style={{ padding: 0 }}>
              {row.to_date ? row.to_date : "current"}
            </TableCell>
            <TableCell align="left" style={{ padding: 0 }}>
              {row.title}
            </TableCell>
          </TableRow>
        );
      });
    }

    return (
      <div>
        {this.state.authenticated !== null && (
          <div>
            {this.state.authenticated && (
              <div>
                <Header as="h1">My History</Header>
                <p>
                  {this.state.userinfo.name}, this is your Salary and Title
                  History.
                </p>
                <br />
                <div
                  style={{
                    color: "white",
                    paddingLeft: 10,
                    background:
                      "linear-gradient(to right, #0c4b78, #3d4e96, #2c76a9)"
                  }}
                >
                  SALARY HISTORY
                </div>
                <Table>
                  <TableBody>
                    <TableRow
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
                        From
                      </TableCell>
                      <TableCell align="left" style={{ padding: 0 }}>
                        To{" "}
                      </TableCell>
                      <TableCell align="left" style={{ padding: 0 }}>
                        Salary
                      </TableCell>
                    </TableRow>

                    {salaryHistory}
                  </TableBody>
                </Table>{" "}
                <br />
                <div
                  style={{
                    color: "white",
                    paddingLeft: 10,
                    background:
                      "linear-gradient(to right, #0c4b78, #3d4e96, #2c76a9)"
                  }}
                >
                  TITLE HISTORY
                </div>
                <Table>
                  <TableBody>
                    <TableRow
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
                        From
                      </TableCell>
                      <TableCell align="left" style={{ padding: 0 }}>
                        To
                      </TableCell>
                      <TableCell align="left" style={{ padding: 0 }}>
                        Title
                      </TableCell>
                    </TableRow>

                    {titleHistory}
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

EmployeeHistory.PropTypes = {
  getCurrentEmployee: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  overview: state.overview,
  employee: state.employee
});

export default connect(
  mapStateToProps,
  { getCurrentEmployee }
)(withAuth(EmployeeHistory));
