const express = require("express");
const Controller = require("../controllers/controller");
const router = express.Router();

// PUBLIC
router.use("/", require("./userRouter"));
router.use("/", require("./orderRouter"));
router.use("/", require("./itemRouter"));
router.get("/", Controller.landingPage);
router.get("/items", Controller.allItems);
router.get("/category/:id", Controller.categoryItems);
router.get("/detail/:id", Controller.itemDetail);

module.exports = router;
