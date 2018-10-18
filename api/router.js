const express = require("express");
const apiErrorHandler = require("./modules/errorHandler");
const indexRouter = require("./resources/index");

let router = express.Router();
router.use("/", indexRouter);
router.use(apiErrorHandler);

module.exports = router;
