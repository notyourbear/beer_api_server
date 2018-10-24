const express = require("express");
const userRouter = require("./user");
const beerRouter = require("./beer");
const locationRouter = require("./location");
const drinkRouter = require("./drink");
const adminRouter = require("./admin");

let router = express.Router();
router.use("/user", userRouter);
router.use("/beer", beerRouter);
router.use("/location", locationRouter);
router.use("/drink", drinkRouter);
router.use("/admin", adminRouter);
module.exports = router;
