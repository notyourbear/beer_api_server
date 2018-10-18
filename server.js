const express = require("express");
const bodyParser = require("body-parser");
const apiRouter = require("./api");

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.use("/api", apiRouter);

// catch all
app.all("*", (req, res) => {
  res.status(404);
});

module.exports = app;
