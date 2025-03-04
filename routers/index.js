const express = require("express");
const Controller = require("../controllers/controller");
const router = express.Router();

router.get("/", Controller.landingPage);

module.exports = router;
