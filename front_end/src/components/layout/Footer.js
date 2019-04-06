import React from "react";
import "./layout.css";
import { Link } from "react-router-dom";
import Grid from "@material-ui/core/Grid";

function Footer() {
  return (
    <footer id="footer">
      <Grid container alignItems="center" justify="space-evenly">
        <Grid container lg={7} alignItems="center" justify="space-evenly">
          <Grid className="footerLayout" item>
            Project Napoli - a Pizza Production
          </Grid>
        </Grid>
      </Grid>
    </footer>
  );
}

export default Footer;
