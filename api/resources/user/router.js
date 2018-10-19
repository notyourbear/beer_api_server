const express = require("express");
const userController = require("./controller");

let userRouter = express.Router();

userRouter.param("name", userController.findByName);

userRouter
  .route("/")
  .get(userController.getAll)
  .post(userController.createOne);

userRouter
  .route("/:name")
  .get(userController.getOne)
  .put(userController.updateOne);

module.exports = userRouter;
