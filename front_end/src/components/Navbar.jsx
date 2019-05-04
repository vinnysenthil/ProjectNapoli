import { withAuth } from "@okta/okta-react";
import { connect } from "react-redux";

import React, { Component } from "react";
import { Container, Icon, Image, Menu } from "semantic-ui-react";
import { checkAuthentication } from "../helpers";
import SearchBar from "./SearchBar";
import { submitQuery } from "../actions/searchActions";
import { Link } from "react-router-dom";
// import { withRouter } from "react-router-dom";
import NapoliLogo from "./images/logo.png";

import "./navbar.css";

// Material-UI Imports Below
import { Button, Grid } from "@material-ui/core";

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
    this.onSearchClick = this.onSearchClick.bind(this);
  }

  async componentDidMount() {
    this.checkAuthentication();
  }

  async componentDidUpdate() {
    this.checkAuthentication();
  }

  async login() {
    this.props.auth.login("/");
  }

  async logout() {
    this.props.auth.logout("/");
  }

  onSearchClick() {
    //NOTE: we assume user will search for name
    // submit query as object with to submitQuery at queryActions.js

    // this.props.submitQuery(this.state.searchQuery);
    this.props.submitQuery("TEST");
  }

  render() {
    let loggedInMarkup = (
      <Grid
        container
        spacing={0}
        justify="space-around"
        alignItems="center"
        lg={4}
      >
        <Grid item className="headerMenu">
          <Link to="/departmentOverview" style={{ color: "white" }}>
            Departments
          </Link>
        </Grid>
        <Grid item className="headerMenu">
          <Link to="/employeeHistory" style={{ color: "white" }}>
            My History
          </Link>
        </Grid>
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
      <Grid container spacing={0} justify="center" alignItems="center" lg={5}>
        <SearchBar searchQuery={this.state.searchQuery} />
        <Grid className=" buttonSearch" item>
          <Button className=" buttonSearch" onClick={this.onSearchClick}>
            SEARCH
          </Button>{" "}
        </Grid>
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
          {1 === 1 ? authorizedMarkUp : null}

          {this.state.authenticated === true ? loggedInMarkup : guestMarkUp}

          {/* {this.props.landing.isInLanding == true
            ? inLandingMarkup
            : notInLandingMarkup}
          {this.props.auth.isAuthenticated ? loggedInMarkup : guestMarkUp} */}
        </Grid>
      </div>

      // <div>
      //   suff
      //   <Menu fixed="top" inverted>
      //     <Container>
      //       {" "}
      //       <Link to="/employeeHistory">suffasdf</Link>
      //       <Menu.Item as="a" header href="/">
      //         <Image size="mini" src="/logo.png" />
      //         &nbsp; Project Napoli
      //       </Menu.Item>
      //       {this.state.authenticated === true && (
      //         <Link to="/departments">
      //           {/* <Menu.Item id="messages-button" as="a"> */}
      //           Departments
      //           {/* </Menu.Item> */}
      //         </Link>
      //       )}
      //       {this.state.authenticated === true && (
      //         <Menu.Item id="profile-button" as="a" href="/profile">
      //           Profile
      //         </Menu.Item>
      //       )}
      //       {this.state.authenticated === true && (
      //         <Menu.Item id="logout-button" as="a" onClick={this.logout}>
      //           Logout
      //         </Menu.Item>
      //       )}
      //       {this.state.authenticated === false && (
      //         <Menu.Item as="a" onClick={this.login}>
      //           Login
      //         </Menu.Item>
      //       )}
      //       {this.state.authenticated === true && (
      //         <SearchBar searchQuery={this.state.searchQuery} />
      //       )}
      //       {this.state.authenticated === true && (
      //         <Menu.Item id="logout-button" as="a" onClick={this.onSearchClick}>
      //           SEARCH
      //         </Menu.Item>
      //       )}
      //     </Container>
      //   </Menu>
      // </div>
    );
  }
}

const mapStateToProps = state => ({
  // upload: state.upload
});

export default withAuth(Navbar);
// mapStateToProps,
// { submitQuery }

// export default connect({ submitQuery })(withAuth()(withRouter(Navbar)));

// export default withAuth(
