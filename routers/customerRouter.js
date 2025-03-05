const express = require("express");
const UserController = require("../controllers/UserController");
const customer = express.Router();
customer.get("/items/add");
customer.get("/users/:id/profile"); //get profile info
customer.post("/users/:id/profile"); //edit profile
customer.get("/favorites", UserController.favoritePage);
customer.get("/items/:id/favorite", UserController.addToFavorite); //addItemToFavorite
customer.get("/items/:id/favorite/delete", UserController.deleteFavorite); //addItemToFavorite
customer.get("/items/favorite/:id/delete", UserController.deleteFromFavorite); //addItemToFavorite
module.exports = customer;
