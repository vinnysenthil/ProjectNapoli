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
import EmployeeHistory from "./components/EmployeeHistory";
import DepartmentsOverview from "./components/DepartmentsOverview";
import IndividualDepartment from "./components/IndividualDepartment";

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div>
            <Security
              issuer={config.oidc.issuer}
              client_id={config.oidc.clientId}
              redirect_uri={config.oidc.redirectUri}
            >
              <Navbar />
              <Switch>
                <Container text style={{ marginTop: "3em" }}>
                  <Route exact path="/" component={Home} />
                  <SecureRoute exact path="/messages" component={Messages} />
                  <SecureRoute exact path="/profile" component={Profile} />
                  <SecureRoute
                    exact
                    path="/employeeHistory"
                    component={EmployeeHistory}
                  />
                  <SecureRoute
                    exact
                    path="/departmentOverview"
                    component={DepartmentsOverview}
                  />
                  <SecureRoute
                    exact
                    path="/individualDepartment"
                    component={IndividualDepartment}
                  />
                </Container>
              </Switch>
              <Route path="/implicit/callback" component={ImplicitCallback} />
            </Security>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
