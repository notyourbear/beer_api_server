const express = require("express");
const drinkController = require("./controller");
const auth = require("../../modules/auth");

let drinkRouter = express.Router();

drinkRouter.param("user", drinkController.findByUser);

drinkRouter
  .route("/")
  .get(drinkController.getAll)
  .post(auth.protect, drinkController.createOne);

drinkRouter.route("/:user").get(drinkController.getByUser);

module.exports = drinkRouter;
