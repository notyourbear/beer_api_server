const express = require("express");
const adminController = require("./controller");

let adminRouter = express.Router();

adminRouter.param("username", adminController.findByUsername);

adminRouter
  .route("/")
  .get(adminController.getAll)
  .post(adminController.createOne);

adminRouter.route("/:username").get(adminController.getOne);

module.exports = adminRouter;
