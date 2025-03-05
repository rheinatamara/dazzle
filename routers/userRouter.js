const express = require("express");
const Controller = require("../controllers/controller");
const UserController = require("../controllers/UserController");
const user = express.Router();

// Customer
user.get("/register", UserController.registerForm);

user.post("/register", UserController.postRegister);
user.get("/login", UserController.loginForm);
user.post("/login", UserController.postLogin);
user.get("/logout", UserController.logOut);
user.get("/", Controller.landingPage);
user.get("/items", Controller.allItems);
user.get("/category/:id", Controller.categoryItems);
user.get("/detail/:id", Controller.itemDetail);

module.exports = user;
