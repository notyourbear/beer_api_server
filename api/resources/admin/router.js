const express = require("express");
const adminController = require("./controller");

let adminRouter = express.Router();

adminRouter.param("username", adminController.findByName);

adminRouter
  .route("/")
  .get(adminController.getAll)
  .post(adminController.createOne);

adminRouter.route("/:name").get(adminController.getOne);

module.exports = adminRouter;
