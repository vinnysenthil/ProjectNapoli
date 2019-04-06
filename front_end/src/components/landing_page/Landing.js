import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
// import { readyLanding, setLandingStatus } from "../../actions/landingActions";

// import SearchWidget from "./search_widget/SearchWidget";

// Animation CSS imports
import "./Landing.css";

// Image imports (For Prototype Only)
// import SD from "./SD.jpg";
// import VG from "./Vegas.jpg";
// import WA from "./WA.jpg";

// Material-UI Imports
import {
  Grid,
  Typography,
  withStyles,
  Card,
  CardActionArea,
  CardContent,
  CardMedia
} from "@material-ui/core";

// Component CSS
let styles = {
  root: {
    width: "auto",
    justify: "center",
    flexGrow: 1
  },
  centerFlexbox: {
    display: "flex"
  },
  searchWidgetBox: {
    alignSelf: "center",
    background: "rgba(0,0,0,0.5)",
    padding: 20,
    width: "100%"
  },
  collageImg: {
    height: "100%"
  },
  noYMarginTop: {
    marginTop: 0,
    marginBottom: 10,
    paddingTop: 0,
    paddingBottom: 0
  },
  cardMedia: {
    height: "25vh"
  }
};

class Landing extends Component {
  constructor() {
    super();
    this.state = {};
  }

  componentDidMount = () => {
    // during logged in , if we change url to landing/home it will redirect to homepage
    // if (this.props.auth.isAuthenticated) {
    //   this.props.history.push("/");
    // }
    // this.props.setLandingStatus(true);
    // this.props.readyLanding();
  };

  // componentWillUnmount = () => {
  //   this.props.setLandingStatus(false);
  // }

  render() {
    // TODO: Create slideshow that dynamically changes based on featured cities
    let { classes, landing } = this.props;

    // let {
    //   header,
    //   deals1,
    //   deals2,
    //   deals3,
    //   featureDestination
    // } = this.props.landing;

    // Generates markup for the header city.
    let genBackgroundImgStyle = () => {
      return {
        display: "flex",
        // backgroundImage: `url(${this.props.landing.inspire})`,
        backgroundSize: "cover",
        maxWidth: "100%",
        maxHeight: "100%",
        height: "95vh",
        minHeight: 450
      };
    };

    return (
      <div>
        <div style={genBackgroundImgStyle()} boxShadow={3}>
          <div className={`${classes.searchWidgetBox} fadeIn`}>
            welcome to PROJECT NAPOLI
          </div>
        </div>
        <br />
        <div
          style={{
            width: "auto",
            height: "auto",
            marginLeft: "5%",
            marginRight: "5%"
          }}
        />
      </div>
    );
  }
}

Landing.propTypes = {
  auth: PropTypes.object.isRequired,
  landing: PropTypes.object.IsRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  landing: state.landing
});

export default connect(
  mapStateToProps,
  {}
  // { readyLanding, setLandingStatus }
)(withStyles(styles)(Landing));
