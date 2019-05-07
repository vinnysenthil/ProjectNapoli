import React from "react";
import InputBase from "@material-ui/core/InputBase";
import { fade } from "@material-ui/core/styles/colorManipulator";
import { withStyles } from "@material-ui/core/styles";
import SearchIcon from "@material-ui/icons/Search";
import { Button, Grid } from "@material-ui/core";
import "./navbar.css";

const styles = theme => ({
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.99),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.95)
    },
    marginRight: theme.spacing.unit * 2,
    marginLeft: 0,
    height: "60%",
    marginTop: 10,
    marginLeft: 35,
    width: "67%"
  },
  searchIcon: {
    width: theme.spacing.unit * 9,
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#000000"
  },
  inputRoot: {
    color: "#000000",
    width: "100%"
  },
  inputInput: {
    paddingTop: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
    paddingLeft: theme.spacing.unit * 10,
    transition: theme.transitions.create("width"),
    width: "100%"
  }
});

class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",

      input: ""
    };

    this.handleChange = this.handleChange.bind(this);
    this.onSearchClick = this.onSearchClick.bind(this);
  }

  handleChange = name => event => {
    this.setState({ [name]: event.target.value });
  };

  onSearchClick() {
    this.props.onHandleSearchQuery(this.state.name);
  }

  render() {
    const { classes } = this.props;

    return (
      <Grid container spacing={0} justify="center" alignItems="center">
        <Grid item className={classes.search}>
          <div className={classes.searchIcon}>
            <SearchIcon />
          </div>
          <InputBase
            placeholder="Search for Firstname, Lastname or Employee ID"
            value={this.state.name}
            onChange={this.handleChange("name")}
            classes={{
              root: classes.inputRoot,
              input: classes.inputInput
            }}
          />
        </Grid>
        <Grid item className="buttonSearch">
          <Button className="buttonSearch" onClick={this.onSearchClick}>
            SEARCH
          </Button>
        </Grid>
      </Grid>
    );
  }
}
export default withStyles(styles)(SearchBar);
