const express = require("express");
const adminController = require("./controller");
const auth = require("../../modules/auth");

let adminRouter = express.Router();

adminRouter.param("username", adminController.findByUsername);

adminRouter
  .route("/")
  .get(auth.protect, adminController.getAll)
  .post(auth.protect, adminController.createOne);

adminRouter.route("/:username").get(adminController.getOne);

module.exports = adminRouter;
