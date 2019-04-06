import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
// import { logoutUser } from "../../actions/authActions";
// import { clearCurrentProfile } from "../../actions/profileActions";
import AnchorLink from "react-anchor-link-smooth-scroll";
import NavbarMenu from "./NavbarMenu";
import SearchIcon from "@material-ui/icons/Search";
import { fade } from "@material-ui/core/styles/colorManipulator";
import InputBase from "@material-ui/core/InputBase";
import { withStyles } from "@material-ui/core/styles";
import SearchBar from "./SearchBar";

import "./layout.css";

// Material-UI Imports Below
import { Button, Grid } from "@material-ui/core";

const styles = theme => ({});

class Navbar extends Component {
  constructor() {
    super();
    this.onLogoutClick = this.onLogoutClick.bind(this);
  }

  onLogoutClick(e) {
    e.preventDefault();
    this.props.clearCurrentProfile();
    this.props.logoutUser();
  }

  render() {
    const { classes } = this.props;

    // Markup shown on the right hand side of Navbar when user is GUEST.
    let guestMarkUp = (
      <Grid
        container
        spacing={0}
        justify="space-evenly"
        alignItems="center"
        xs={4}
        sm={4}
        md={3}
        lg={3}
      >
        {/* <Grid item>
          <Link to="/register">
            <Button class="navButtons buttonGrey" primary>
              Sign Up
            </Button>
          </Link>
        </Grid> */}
        <Grid item>
          <Link to="/login">
            <Button class="navButtons buttonBlue" primary>
              Login
            </Button>
          </Link>
        </Grid>
      </Grid>
    );

    // Markup shown on the right hand side of Navbar when user is LOGGED IN.
    let loggedInMarkup = (
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
        <Grid className="adjustMenuBurger" item>
          <NavbarMenu
            onLogoutClick={this.onLogoutClick}
            // userEmail={this.props.auth.user.email}
          />
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
                  <img className="abode-logo" src="logo.png" alt="" />
                </Grid>

                <Grid item className="abodeHome">
                  Project Napoli
                </Grid>
              </Grid>
            </Link>
          </Grid>
          <Grid item md={5} lg={5}>
            <SearchBar />
          </Grid>
          {guestMarkUp}
          {/* {this.props.landing.isInLanding == true
            ? inLandingMarkup
            : notInLandingMarkup}
          {this.props.auth.isAuthenticated ? loggedInMarkup : guestMarkUp} */}
        </Grid>
      </div>
    );
  }
}

Navbar.propTypes = {
  auth: PropTypes.object.isRequired,
  landing: PropTypes.object.isRequired
};

let mapStateToProps = state => ({
  auth: state.auth,
  landing: state.landing
});

export default withStyles(styles)(
  connect(
    mapStateToProps,
    {}
    // { logoutUser, clearCurrentProfile }
  )(Navbar)
);
