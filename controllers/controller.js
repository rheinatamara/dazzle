const { Category, Item, Favorite, User, Order } = require("../models");
class Controller {
  static async landingPage(req, res) {
    try {
      // let { userId } = req.session;
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

  static async allItems(req, res) {
    try {
      const data = await Item.findAll({
        order: [["createdAt", "DESC"]],
      });
      res.render("items", { data });
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
  static async itemDetail(req, res) {
    try {
      const { id } = req.params;
      let { userId } = req.session;
      let isLogin = !!userId;
      let isFavorited = false;
      const data = await Item.findByPk(+id, { include: Category });
      if (!data) return res.send("Item not found");
      if (isLogin) {
        isFavorited = await Item.isFavorite(userId, id);
      }
      res.render("detailPage", { data, isLogin, isFavorited });
    } catch (error) {
      res.send(error);
    }
  }
}

module.exports = Controller;
