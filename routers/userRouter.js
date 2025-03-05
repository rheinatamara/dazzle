const express = require("express");
const UserController = require("../controllers/UserController");
const user = express.Router();

// ADMIN
user.post("/register");
user.post("/login");

// Customer
user.post("/users/register");
user.post("/users/login");
user.get("/users/:id/profile"); //get profile info
user.post("/users/:id/profile"); //edit profile
user.get("/favorites", UserController.favoritePage);
user.post("/users/:id/favorites"); //addFavorite

module.exports = user;
