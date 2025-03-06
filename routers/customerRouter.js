const express = require("express");
const OrderController = require("../controllers/OrderController");
const UserController = require("../controllers/UserController");
const customer = express.Router();
customer.get("/items/:id/add", OrderController.addToCart); //addItem to cart
customer.get("/cart", OrderController.showCart); //seeCart
customer.get("/checkout", OrderController.checkout); //checkout
customer.get("/users/:id/profile", UserController.getProfilePage); //get profile info
customer.post("/users/:id/profile", UserController.postProfilePage); //edit profile
customer.get("/favorites", UserController.favoritePage);
customer.get("/items/:id/favorite", UserController.addToFavorite); //addItemToFavorite
customer.get("/items/:id/favorite/delete", UserController.deleteFavorite); //addItemToFavorite
customer.get("/items/favorite/:id/delete", UserController.deleteFromFavorite); //addItemToFavorite
module.exports = customer;
