import { Button, Header } from "semantic-ui-react";
import { checkAuthentication } from "../helpers";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";

import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { withAuth } from "@okta/okta-react";
import Table from "@material-ui/core/Table";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import TableBody from "@material-ui/core/TableBody";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import { withRouter } from "react-router-dom";

// Actions
import { getDepartments } from "../actions/overviewActions";

let id = 0;
function createData(firstCol, secondCol) {
  id += firstCol + 1;
  return { id, firstCol, secondCol };
}

const styles = {
  card: {
    width: 200,
    height: 150
  }
};

class DepartmentsOverview extends Component {
  constructor(props) {
    super(props);
    this.state = { authenticated: null, userinfo: null };
    this.checkAuthentication = checkAuthentication.bind(this);
    this.login = this.login.bind(this);
    this.onclickDept = this.onclickDept.bind(this);
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

  onclickDept = deptNumber => event => {
    event.preventDefault();
    this.props.getDepartments(deptNumber);

    this.props.history.push("/individualDepartment");
  };

  render() {
    const { classes } = this.props;

    let DepartmentList;

    DepartmentList = [
      createData("Marketing", "d001"),
      createData("Finance", "d002"),
      createData("Human Resources", "d003"),
      createData("Production", "d004"),
      createData("Development", "d005"),
      createData("Quality Management", "d006"),
      createData("Sales", "d007"),
      createData("Research", "d008"),
      createData("Customer Service", "d009")
    ];

    return (
      <div>
        {this.state.authenticated !== null && (
          <div>
            {this.state.authenticated && (
              <div>
                <Header as="h1">All Departments of Project Napoli</Header>
                <br />
                <Grid container spacing={24}>
                  {DepartmentList.map(row => {
                    return (
                      <Grid item>
                        <Card className={classes.card}>
                          <CardContent>
                            <Typography variant="h5" component="h2">
                              {row.firstCol}
                            </Typography>
                            <Button
                              id="login-button"
                              secondary
                              onClick={this.onclickDept(row.secondCol)}
                            >
                              More Info
                            </Button>
                          </CardContent>
                        </Card>
                      </Grid>
                    );
                  })}
                </Grid>
                <br /> <br />
                <br />
              </div>
            )}
          </div>
        )}
      </div>
    );
  }
}

DepartmentsOverview.PropTypes = {
  getCurrentEmployee: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  overview: state.overview,
  employee: state.employee
});

export default connect(
  mapStateToProps,
  { getDepartments }
)(withStyles(styles)(withAuth(withRouter(DepartmentsOverview))));

// withStyles(styles)(withAuth(DepartmentsOverview));
