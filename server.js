const express = require("express");
const bodyParser = require("body-parser");
const logger = require("morgan");

const dbConnect = require("./db");
const apiRouter = require("./api");
const auth = require("./api/modules/auth");

const environment = process.env.NODE_ENV; // development

dbConnect();

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

if (environment !== "production") {
  app.use(logger("dev"));
}

// router
app.use("/signin", auth.signin);
app.use("/api", auth.protect, apiRouter);

// catch all
app.all("*", (req, res) => {
  res.status(404);
});

module.exports = app;
