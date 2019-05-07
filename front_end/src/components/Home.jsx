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

let id = 0;
function createData(firstCol, secondCol) {
  id += firstCol + 1;
  return { id, firstCol, secondCol };
}

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = { authenticated: null, userinfo: null };
    this.checkAuthentication = checkAuthentication.bind(this);
    this.login = this.login.bind(this);
  }

  async componentDidMount() {
    this.checkAuthentication();
  }

  async componentDidUpdate() {
    this.checkAuthentication();

    if (this.props.employee.employeeCheck)
      this.props.getCurrentEmployee(this.props.employee.employeeCheck.id);
  }

  async login() {
    this.props.auth.login("/");
  }

  render() {
    const { employeeData } = this.props.employee;

    let EmployeeDataRows = [];

    if (employeeData.curr_salary)
      EmployeeDataRows = [
        createData("Employee ID:", employeeData.emp_no),
        createData("DOB:", employeeData.birth_date),
        createData("Firstname:", employeeData.first_name),
        createData("Lastname:", employeeData.last_name),
        createData("Gender:", employeeData.gender),
        createData("Hire Date:", employeeData.hire_date),
        createData(
          "Salary:",
          "$ " +
            employeeData.curr_salary
              .toFixed(2)
              .replace(/\d(?=(\d{3})+\.)/g, "$&,")
        ),
        createData("Department:", employeeData.curr_dept),
        createData("Title:", employeeData.curr_title)
      ];

    return (
      <div>
        {this.state.authenticated !== null && (
          <div>
            {this.state.authenticated && (
              <div>
                <Header as="h1">Project Napoli Employee Dashboard</Header>
                <p>Welcome back, {this.state.userinfo.name}!</p>
                <Link to="/employeeHistory">
                  <Button id="login-button" primary>
                    My History
                  </Button>
                </Link>
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
            {!this.state.authenticated && (
              <div>
                <Header as="h1">Welcome to Project Napoli</Header>

                <p>Please log in to access your Employee Dashboard.</p>

                <Button id="login-button" primary onClick={this.login}>
                  Login
                </Button>
              </div>
            )}
          </div>
        )}
      </div>
    );
  }
}

Home.PropTypes = {
  getCurrentEmployee: PropTypes.func.isRequired
  // checkCurrentEmployee: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  overview: state.overview,
  employee: state.employee
});

export default connect(
  mapStateToProps,
  { getCurrentEmployee }
)(withAuth(Home));
