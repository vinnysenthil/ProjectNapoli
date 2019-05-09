var express = require("express");
var logger = require("winston");
var cors = require("cors");
var auth = require('./middlewares/auth');

// API routes
var mainRouter = require('./routes/index');


const app = express();
app.use(cors());
// app.use(auth);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Enable CORS Globally

app.use('/api',  mainRouter);

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

module.exports = app;