const express = require("express");
const UserController = require("../controllers/UserController");
const customer = express.Router();
customer.get("/items/add");
customer.get("/users/:id/profile"); //get profile info
customer.post("/users/:id/profile"); //edit profile
customer.get("/favorites", UserController.favoritePage);
customer.post("/users/:id/favorites"); //addFavorite
module.exports = customer;
