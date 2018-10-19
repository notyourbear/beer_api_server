const express = require("express");
const userRouter = require("./user");
// const beerRouter = require("./beer");
// const locationRouter = require("./location");
// const breweryRouter = require("./brewery");

let router = express.Router();
router.use("/user", userRouter);
// router.use("/beer", beerRouter);
// router.use("/location", locationRouter);
// router.use("/brewery", breweryRouter);
module.exports = router;
