const express = require("express");
const Controller = require("../controllers/controller");
const router = express.Router();

// USER
router.get("/register");
router.get("/login");
router.get("/users/:id/profile"); // Protected
router.post("/users/:id/profile"); //protected

//Favorites
router.get("/favorites", Controller.favoritePage);
router.get("/users/:id/favorites"); // Protected
router.post("/users/:id/favorites"); // Protected

router.post("/orders"); // Protected. to make an order

// Orders
router.get("/orders/:id/items"); // Protected
router.post("/orders/:id/items"); // Protected
router.delete("/orders/:id/items/:itemId"); // Protected

// Admin-only
router.post("/items"); // Admin-only
router.post("/items/:id"); // Admin-only , update
router.delete("/items/:id"); // Admin-only

// PUBLIC
router.get("/", Controller.landingPage);
router.get("/items", Controller.allItems);
router.get("/category/:id", Controller.categoryItems);
router.get("/detail/:id", Controller.itemDetail);
module.exports = router;
