const express = require("express");
const OrderController = require("../controllers/OrderController");
const order = express.Router();

order.get("/orders"); //see orders
order.post("/orders/items/:itemId"); //make an order
order.delete("/orders/items/:itemId"); // delete an order

module.exports = order;
