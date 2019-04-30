import { withAuth } from "@okta/okta-react";
import { connect } from "react-redux";

import React, { Component } from "react";
import { Container, Icon, Image, Menu } from "semantic-ui-react";
import { checkAuthentication } from "../helpers";
import SearchBar from "./SearchBar";
import { submitQuery } from "../actions/searchActions";
// import { withRouter } from "react-router-dom";

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
    return (
      <div>
        <Menu fixed="top" inverted>
          <Container>
            <Menu.Item as="a" header href="/">
              <Image size="mini" src="/logo.png" />
              &nbsp; Project Napoli
            </Menu.Item>
            {this.state.authenticated === true && (
              <Menu.Item id="messages-button" as="a" href="/messages">
                <Icon name="mail outline" />
                Messages
              </Menu.Item>
            )}
            {this.state.authenticated === true && (
              <Menu.Item id="profile-button" as="a" href="/profile">
                Profile
              </Menu.Item>
            )}
            {this.state.authenticated === true && (
              <Menu.Item id="logout-button" as="a" onClick={this.logout}>
                Logout
              </Menu.Item>
            )}
            {this.state.authenticated === false && (
              <Menu.Item as="a" onClick={this.login}>
                Login
              </Menu.Item>
            )}
            {this.state.authenticated === true && (
              <SearchBar searchQuery={this.state.searchQuery} />
            )}
            {this.state.authenticated === true && (
              <Menu.Item id="logout-button" as="a" onClick={this.onSearchClick}>
                SEARCH
              </Menu.Item>
            )}
          </Container>
        </Menu>
      </div>
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
