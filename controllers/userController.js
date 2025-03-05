const { Category, Item } = require("../models");

class UserController {
  static async favoritePage(req, res) {
    try {
      const data = await Item.findAll({
        order: [["createdAt", "DESC"]],
      }); //untuk dummy aja
      res.render("favorite", { data });
    } catch (error) {
      res.send(error);
    }
  }
}

module.exports = UserController;
