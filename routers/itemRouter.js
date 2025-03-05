const express = require("express");
const ItemController = require("../controllers/ItemController");
const item = express.Router();

// ADMIN ONLY
item.get("/items/add");
item.post("/items/add"); // Admin-only
item.post("/items/:id/update"); // Admin-only , update
item.delete("/items/:id"); // Admin-only

module.exports = item;
