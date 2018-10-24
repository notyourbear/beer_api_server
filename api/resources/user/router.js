const express = require("express");
const userController = require("./controller");
const auth = require("../../modules/auth");

let userRouter = express.Router();

userRouter.param("name", userController.findByName);

userRouter
  .route("/")
  .get(userController.getAll)
  .post(auth.protect, userController.createOne);

userRouter.route("/:name").get(userController.getOne);

module.exports = userRouter;
