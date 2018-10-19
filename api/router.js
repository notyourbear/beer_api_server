const express = require("express");
const apiErrorHandler = require("./modules/errorHandler");
const apiRouter = require("./resources");

let router = express.Router();
router.use("/", apiRouter);
router.use(apiErrorHandler);

module.exports = router;
