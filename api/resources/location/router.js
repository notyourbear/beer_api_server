const express = require("express");
const locationController = require("./controller");
const auth = require("../../modules/auth");

let locationRouter = express.Router();

locationRouter
  .route("/")
  .get(locationController.getAll)
  .post(auth.protect, locationController.createOne);

module.exports = locationRouter;
