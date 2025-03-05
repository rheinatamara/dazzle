const { Category, Item } = require("../models");
class Controller {
  static async landingPage(req, res) {
    try {
      const items = await Item.findAll({
        limit: 3,
        order: [["createdAt", "DESC"]],
      });
      const data = await Category.findAll();

      res.render("landingPage", { data, items });
    } catch (error) {
      res.send(error);
    }
  }
  static async categoryItems(req, res) {
    try {
      let { id } = req.params;
      let data = await Category.findByPk(+id, {
        include: Item,
      });
      res.render("category", { data });
    } catch (error) {
      res.send(error);
    }
  }
}

module.exports = Controller;
