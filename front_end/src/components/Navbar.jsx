import { withAuth } from "@okta/okta-react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import React, { Component } from "react";
import { checkAuthentication } from "../helpers";
import SearchBar from "./SearchBar";
import { submitQuery, saveQuery } from "../actions/searchActions";
import { Link } from "react-router-dom";
import NapoliLogo from "./images/logo.png";
import { withRouter } from "react-router-dom";

import "./navbar.css";

// Material-UI Imports Below
import { Button, Grid } from "@material-ui/core";

// Actions
import {
  checkCurrentEmployee,
  clearEmployee
} from "../actions/employeeActions";

var checkedIn = false;

class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchQuery: ""
    };
    this.state = { authenticated: null };
    this.checkAuthentication = checkAuthentication.bind(this);
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
    this.onHandleSearchQuery = this.onHandleSearchQuery.bind(this);
  }

  async componentWillMount() {
    this.checkAuthentication();
  }

  async componentDidMount() {
    this.checkAuthentication();
  }

  async componentDidUpdate() {
    this.checkAuthentication();

    if (this.state.authenticated && this.state.userinfo && !checkedIn) {
      await this.props.checkCurrentEmployee(this.state.userinfo.name);

      checkedIn = true;
    }
  }

  async login() {
    this.props.auth.login("/");
  }

  async logout() {
    this.props.auth.logout("/");
    this.props.clearEmployee();
  }

  onHandleSearchQuery(newQueryString) {
    let newQuery = {
      query: newQueryString,
      page: 0,
      dept: this.props.query.searchQuery
        ? this.props.query.searchQuery.dept
        : null
    };

    this.props.submitQuery(newQuery);
    this.props.saveQuery(newQueryString);
    this.props.history.push("/searchresult");
  }

  render() {
    let loggedInMarkup = (
      <Grid
        container
        spacing={0}
        justify="space-around"
        alignItems="center"
        md={4}
        lg={4}
      >
        {this.props.employee.employeeCheck &&
        this.props.employee.employeeCheck.fired === false ? (
          <Grid item className="headerMenu">
            <Link to="/departmentOverview" style={{ color: "white" }}>
              Departments
            </Link>
          </Grid>
        ) : null}
        {this.props.employee.employeeCheck &&
        this.props.employee.employeeCheck.fired === false ? (
          <Grid item className="headerMenu">
            <Link to="/employeeHistory" style={{ color: "white" }}>
              My History
            </Link>
          </Grid>
        ) : null}
        <Grid className="navButtons buttonBlue" item>
          <Button className="navButtons buttonBlue" onClick={this.logout}>
            Logout
          </Button>
        </Grid>
      </Grid>
    );

    let guestMarkUp = (
      <Grid
        container
        spacing={0}
        justify="space-around"
        alignItems="center"
        xs={2}
        sm={2}
        md={3}
        lg={3}
      >
        <Grid className="navButtons buttonBlue" item>
          <Button className="navButtons buttonBlue" onClick={this.login}>
            Login
          </Button>
        </Grid>
      </Grid>
    );

    let authorizedMarkUp = (
      <Grid
        container
        spacing={0}
        justify="center"
        alignItems="center"
        md={6}
        lg={6}
      >
        <SearchBar
          onHandleSearchQuery={this.onHandleSearchQuery}
          searchQuery={this.state.searchQuery}
        />
      </Grid>
    );

    return (
      <div className="navbarContainer ">
        <Grid
          container
          className="navbarContainer headerfont"
          spacing={0}
          direction="row"
          justify="space-between"
          alignItems="center"
        >
          <Grid className="navbarLogo" item>
            <Link to="/">
              <Grid
                container
                direction="row"
                justify="space-between"
                alignItems="center"
              >
                <Grid item>
                  <img
                    className="abode-logo"
                    src={NapoliLogo}
                    alt="Napoli Logo"
                  />
                </Grid>

                <Grid item className="abodeHome">
                  Napoli
                </Grid>
              </Grid>
            </Link>
          </Grid>
          {this.props.employee.employeeCheck &&
          this.props.employee.employeeCheck.manager === true &&
          this.props.employee.employeeCheck.fired === false
            ? authorizedMarkUp
            : null}

          {this.state.authenticated === true ? loggedInMarkup : guestMarkUp}
        </Grid>
      </div>
    );
  }
}

Navbar.PropTypes = {
  getCurrentEmployee: PropTypes.func.isRequired,
  checkCurrentEmployee: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  employee: state.employee,
  query: state.query
});

export default connect(
  mapStateToProps,
  { checkCurrentEmployee, clearEmployee, submitQuery, saveQuery }
)(withAuth(withRouter(Navbar)));
