const express = require("express");
const drinkController = require("./controller");

let drinkRouter = express.Router();

drinkRouter.param("user", drinkController.findByUser);

drinkRouter
  .route("/")
  .get(drinkController.getAll)
  .post(drinkController.createOne);

drinkRouter.route("/:user").get(drinkController.getByUser);

module.exports = drinkRouter;
