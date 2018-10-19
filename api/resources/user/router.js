const express = require("express");
const userController = require("./controller");

let userRouter = express.Router();

userRouter
  .route("/")
  .get(userController.getAll)
  .post(userController.createOne);

userRouter
  .route("/:id")
  .get(userController.getOne)
  .put(userController.updateOne);

module.exports = userRouter;
