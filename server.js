const express = require("express");
const bodyParser = require("body-parser");
const logger = require("morgan");
const compression = require("compression");

const dbConnect = require("./db");
const apiRouter = require("./api");
const auth = require("./api/modules/auth");

const environment = process.env.NODE_ENV; // development

dbConnect();

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(compression());

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,POST,OPTIONS");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, X-Custom-Header"
  );
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }
  next();
});

if (environment !== "production") {
  app.use(logger("dev"));
}

// router
app.use("/signin", auth.verifyAdmin, auth.signin);
app.use("/api", apiRouter);

// catch all
app.all("*", (req, res) => {
  res.status(404);
});

module.exports = app;
