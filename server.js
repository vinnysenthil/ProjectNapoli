var express = require("express");
var session = require('express-session');
// var passport = require("passport");  TODO - Fix to work with MySQL
var path = require("path");
var logger = require("winston");
var sequelize = require('./services/sequelize');

// API routes
var mainRouter = require('./routes/index');


// get some functionalities from express library like get() function
var app = express();

// Passport middleware
// app.use(passport.initialize());  TODO - Fix to work with MySQL

// bring passport library to config/passport.js
// require("./config/passport")(passport);  TODO - Fix to work with MySQL

app.use('/api', mainRouter);

// Server static assets if in production
if (process.env.NODE_ENV === "production") {
  // Set static folder
  app.use(express.static("front_end/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "front_end", "build", "index.html"));
  });
}

// using port deployed to Heroku || use local port 5000
const port = process.env.PORT || 172;

// listen to port when server is running
app.listen(port, () => logger.info(`Server running on port ${port}`));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

module.exports = app;