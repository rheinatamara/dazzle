const express = require("express");
const authentication = require("../middlewares/authentication");
const authorization = require("../middlewares/authorization");
const router = express.Router();

// PUBLIC
router.use("/", require("./userRouter"));
router.use(authentication);
router.use("/", require("./customerRouter"));
router.use("/", require("./orderRouter"));
router.use(authorization);
router.use("/", require("./adminRouter"));

module.exports = router;
