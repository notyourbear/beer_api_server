const express = require("express");
const beerController = require("./controller");

let beerRouter = express.Router();

beerRouter
  .route("/")
  .get(beerController.getAll)
  .post(beerController.createOne);

module.exports = beerRouter;
