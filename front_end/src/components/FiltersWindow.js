import React, { Component } from "react";
import PropTypes from "prop-types";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";

// Material UI Imports
import {
  withStyles,
  withWidth,
  Checkbox,
  Grid,
  Divider,
  Typography,
  TextField,
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails,
  MenuItem,
  Button,
  Menu,
  Hidden
} from "@material-ui/core";
import { isWidthDown } from "@material-ui/core/withWidth";
import { ExpandMore, FilterList } from "@material-ui/icons";

// Component styling
let styles = theme => ({
  rating: {
    padding: 0,
    margin: 0
  },
  subtitles: { fontWeight: "bold", color: "#808080" },
  pad10: {
    padding: 10
  },
  stars: {
    zIndex: 0
  }
});

class FiltersWindow extends Component {
  constructor() {
    super();
    this.state = {
      departmentChosen: null
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange = event => {
    this.setState({ departmentChosen: event.target.value });
  };

  // let departmentChosen = null;
  render() {
    let {
      classes,
      width,
      marketing,
      finance,
      human_resources,
      production,
      development,
      quality_management,
      sales,
      research,
      customer_service,
      handleAmenities,
      handleFiltersApply
    } = this.props;

    console.log("dept chosen:" + this.state.departmentChosen);
    return (
      <Grid
        item
        xs={12}
        sm={4}
        md={3}
        lg={3}
        direction={isWidthDown("sm", width) ? "row" : "column"}
        justify={"flex-start"}
        spacing={0}
      >
        <ExpansionPanel
          defaultExpanded={width == "xs" ? false : true}
          square="false"
        >
          <ExpansionPanelSummary expandIcon={<ExpandMore />}>
            <Typography className={classes.subtitles} variant="subtitle2">
              <FilterList /> Filters
            </Typography>
          </ExpansionPanelSummary>
          <Divider />
          <ExpansionPanelDetails className={classes.rating}>
            <Grid
              container
              direction={isWidthDown("sm", width) ? "row" : "column"}
              justify="flex-start"
              spacing={0}
            >
              <Grid item xs={12} md="auto" spacing={0}>
                <Grid container direction="column" className={classes.pad10}>
                  <Grid item>
                    <Typography
                      className={classes.subtitles}
                      variant="subtitle2"
                    >
                      Departments:
                    </Typography>
                  </Grid>

                  <FormControl
                    component="fieldset"
                    className={classes.formControl}
                  >
                    <RadioGroup
                      aria-label="Department"
                      name="Department"
                      className={classes.group}
                      value={this.state.departmentChosen}
                      onChange={this.handleChange}
                    >
                      <FormControlLabel
                        value={1}
                        control={<Radio />}
                        label="Marketing"
                      />
                      <FormControlLabel
                        value={2}
                        control={<Radio />}
                        label="Finance"
                      />
                      <FormControlLabel
                        value={3}
                        control={<Radio />}
                        label="Human Resources"
                      />
                      <FormControlLabel
                        value={4}
                        control={<Radio />}
                        label="Production"
                      />{" "}
                      <FormControlLabel
                        value={5}
                        control={<Radio />}
                        label="Development"
                      />{" "}
                      <FormControlLabel
                        value={6}
                        control={<Radio />}
                        label="Quality Management"
                      />{" "}
                      <FormControlLabel
                        value={7}
                        control={<Radio />}
                        label="Sales"
                      />{" "}
                      <FormControlLabel
                        value={8}
                        control={<Radio />}
                        label="Research"
                      />{" "}
                      <FormControlLabel
                        value={9}
                        control={<Radio />}
                        label="Customer Service"
                      />
                    </RadioGroup>
                  </FormControl>

                  {/* <Grid item>
                  <FormControlLabel
                    className={classes.rating}
                    label="Marketing"
                    control={
                      <Checkbox
                        checked={marketing}
                        onChange={handleAmenities("marketing")}
                      />
                    }
                  />
                </Grid>
                <Grid item>
                  <FormControlLabel
                    className={classes.rating}
                    label="Finance"
                    control={
                      <Checkbox
                        checked={finance}
                        onChange={handleAmenities("finance")}
                      />
                    }
                  />
                </Grid>
                <Grid item>
                  <FormControlLabel
                    className={classes.rating}
                    label="Human Resources"
                    control={
                      <Checkbox
                        checked={human_resources}
                        onChange={handleAmenities("human_resources")}
                      />
                    }
                  />
                </Grid>
                <Grid item>
                  <FormControlLabel
                    className={classes.rating}
                    label="Production"
                    control={
                      <Checkbox
                        checked={production}
                        onChange={handleAmenities("production")}
                      />
                    }
                  />
                </Grid>
                <Grid item>
                  <FormControlLabel
                    className={classes.rating}
                    label="Development"
                    control={
                      <Checkbox
                        checked={development}
                        onChange={handleAmenities("development")}
                      />
                    }
                  />
                </Grid>
                <Grid item>
                  <FormControlLabel
                    className={classes.rating}
                    label="Quality Management"
                    control={
                      <Checkbox
                        checked={quality_management}
                        onChange={handleAmenities("quality_management")}
                      />
                    }
                  />
                </Grid>
                <Grid item>
                  <FormControlLabel
                    className={classes.rating}
                    label="Sales"
                    control={
                      <Checkbox
                        checked={sales}
                        onChange={handleAmenities("sales")}
                      />
                    }
                  />
                </Grid>
                <Grid item>
                  <FormControlLabel
                    className={classes.rating}
                    label="Research"
                    control={
                      <Checkbox
                        checked={research}
                        onChange={handleAmenities("research")}
                      />
                    }
                  />
                </Grid>
                <Grid item>
                  <FormControlLabel
                    className={classes.rating}
                    label="Customer Service"
                    control={
                      <Checkbox
                        checked={customer_service}
                        onChange={handleAmenities("customer_service")}
                      />
                    }
                  />
                </Grid> */}
                </Grid>
                <Divider />
              </Grid>
              <Grid item xs={12} md="auto">
                <Grid container className={classes.pad10} justify="center">
                  <Grid item xs={8}>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={handleFiltersApply(this.state.departmentChosen)}
                      style={{ width: "100%" }}
                    >
                      Apply
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </ExpansionPanelDetails>
        </ExpansionPanel>
      </Grid>
    );
  }
}

FiltersWindow.propTypes = {
  classes: PropTypes.object.isRequired,
  star_rate: PropTypes.number.isRequired,
  guest_rate: PropTypes.number.isRequired,
  price_low: PropTypes.number.isRequired,
  price_high: PropTypes.number.isrequired,
  handleAmenities: PropTypes.func.isRequired,
  handleStarRatings: PropTypes.func.isRequired,
  handleGuestRatings: PropTypes.func.isRequired,
  handlePriceRangeChange: PropTypes.func.isRequired,
  width: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  query: state.query
});

export default withStyles(styles)(withWidth()(FiltersWindow));
