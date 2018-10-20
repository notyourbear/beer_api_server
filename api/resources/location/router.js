const express = require("express");
const locationController = require("./controller");

let locationRouter = express.Router();

locationRouter
  .route("/")
  .get(locationController.getAll)
  .post(locationController.createOne);

module.exports = locationRouter;
