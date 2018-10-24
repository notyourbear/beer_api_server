const express = require("express");
const beerController = require("./controller");
const auth = require("../../modules/auth");

let beerRouter = express.Router();

beerRouter
  .route("/")
  .get(beerController.getAll)
  .post(auth.protect, beerController.createOne);

module.exports = beerRouter;
