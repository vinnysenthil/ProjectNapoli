import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Security, SecureRoute, ImplicitCallback } from "@okta/okta-react";
import { Provider } from "react-redux";
import store from "./store";

import { Container } from "semantic-ui-react";
import config from "./.samples.config";
import Home from "./components/Home";
import Messages from "./components/Messages";
import Navbar from "./components/Navbar";
import Profile from "./components/Profile";

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div>
          <Router>
            <Security
              issuer={config.oidc.issuer}
              client_id={config.oidc.clientId}
              redirect_uri={config.oidc.redirectUri}
            >
              <Navbar />
              <Switch>
                <Container text style={{ marginTop: "7em" }}>
                  <Route path="/" component={Home} />
                  <SecureRoute path="/messages" component={Messages} />
                  <SecureRoute path="/profile" component={Profile} />
                </Container>
              </Switch>
              <Route path="/implicit/callback" component={ImplicitCallback} />
            </Security>
          </Router>
        </div>
      </Provider>
    );
  }
}

export default App;
