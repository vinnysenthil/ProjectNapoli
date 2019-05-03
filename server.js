var express = require("express");
var path = require("path");
var logger = require("winston");
var cors = require("cors");
var auth = require('./middlewares/auth');

// API routes
var mainRouter = require('./routes/index');

var app = express();

// app.use(auth)

// Manually Enable Cross-Origin Resource Sharing (CORS) 
var corsManual = function (req, res, next) {
  
  res.header('Access-Control-Allow-Origin', '*'); // ALLOWING REQUESTS FROM ALL ORIGINS
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,PATCH,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, withcredentials');
  res.header('Access-Control-Allow-Credentials', true);

  if (req.method === 'OPTIONS') {
    // OPTIONS requests should immediately respond back to the client with the CORS headers.
    res.status(200).end();
  
  } else {
    // Otherwise, continue to next.
    next();
  }
};

// Enable CORS Globally
app.use(cors());

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