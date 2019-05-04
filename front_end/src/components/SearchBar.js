import React from "react";
import InputBase from "@material-ui/core/InputBase";
import { fade } from "@material-ui/core/styles/colorManipulator";
import { withStyles } from "@material-ui/core/styles";
import SearchIcon from "@material-ui/icons/Search";

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

    // this.handleChange = this.handleChange.bind(this);
  }

  // handleChange = (event, { newValue }) => {
  //   this.props.onHandleDestinationName(newValue);
  // };

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.search}>
        <div className={classes.searchIcon}>
          <SearchIcon />
        </div>
        <InputBase
          placeholder="Search for Employee or Department"
          value={this.props.destinationName}
          // onChange={this.handleChange()}
          classes={{
            root: classes.inputRoot,
            input: classes.inputInput
          }}
        />
      </div>
    );
  }
}
export default withStyles(styles)(SearchBar);
