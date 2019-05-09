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
// import { Chart } from "frappe-charts";
// import { Chart } from "frappe-charts/dist/frappe-charts.min.esm";
import Chart from "./Graph";

// Actions
import { clearDepartment } from "../actions/overviewActions";

class DepartmentOverview extends Component {
  constructor(props) {
    super(props);
    this.state = { authenticated: null, userinfo: null };
    this.checkAuthentication = checkAuthentication.bind(this);
    this.login = this.login.bind(this);
  }

  async componentDidMount() {
    this.checkAuthentication();
  }

  async componentWillUnmount() {
    this.props.clearDepartment();
  }

  async componentDidUpdate() {
    this.checkAuthentication();
  }

  async login() {
    this.props.auth.login("/");
  }

  render() {
    let { departments } = this.props.overview;

    let nameShort = null;
    if (departments) {
      nameShort = departments.deptName;

      switch (departments.deptName) {
        case "Human Resources":
          nameShort = "HR";
          break;
        case "Development":
          nameShort = "Develop";
          break;
        case "Quality Management":
          nameShort = "Q. Mgmt";
          break;
        case "Customer Service":
          nameShort = "C. Service";
          break;
      }
    }
    return (
      <div>
        {this.state.authenticated !== null && (
          <div>
            {this.state.authenticated && departments && (
              <div>
                <Header as="h2">{departments.deptName}</Header>
                <br />
                Total employees: {departments.totalEmployees} <br /> <br />{" "}
                <br />
                <Chart
                  title="Share of total company expenses in %"
                  type="percentage"
                  data={{
                    labels: [nameShort, "Other Departments"],
                    datasets: [
                      {
                        values: [
                          departments.shareOfCompanyCost,
                          1 - departments.shareOfCompanyCost
                        ]
                      }
                    ]
                  }}
                />
                Share of total company expenses:
                <br />
                <Chart
                  title="Gender Equality Chart in %"
                  type="percentage"
                  data={{
                    labels: ["Male", "Female"],
                    datasets: [
                      {
                        values: [departments.male, departments.female]
                      }
                    ]
                  }}
                />
                <Chart
                  title="Gender Pay Equality Chart in USD"
                  type="bar"
                  data={{
                    labels: ["Male", "Female"],
                    datasets: [
                      {
                        values: [
                          departments.avgMaleSalary,
                          departments.avgFemaleSalary
                        ]
                      }
                    ]
                  }}
                />
              </div>
            )}
          </div>
        )}
      </div>
    );
  }
}

DepartmentOverview.PropTypes = {
  getCurrentEmployee: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  overview: state.overview,
  employee: state.employee
});

export default connect(
  mapStateToProps,
  { clearDepartment }
)(withAuth(DepartmentOverview));
