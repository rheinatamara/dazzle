const express = require("express");
const ItemController = require("../controllers/ItemController");
const admin = express.Router();

// ADMIN ONLY

admin.post("/items/add"); // Admin-only
admin.post("/items/:id/update"); // Admin-only , update
admin.delete("/items/:id"); // Admin-only

module.exports = admin;
