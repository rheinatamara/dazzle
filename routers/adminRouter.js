const express = require("express");
const ItemController = require("../controllers/ItemController");
const admin = express.Router();

// ADMIN ONLY
admin.get("/dashboard", ItemController.dashboard);
admin.get("/dashboard/add", ItemController.addItemForm);
admin.post("/dashboard/add", ItemController.postItemForm);
admin.get("/dashboard/:id/edit", ItemController.getEditItem);
admin.post("/dashboard/:id/edit", ItemController.postEditItem);
admin.get("/dashboard/:id/delete", ItemController.deleteItem);

module.exports = admin;
