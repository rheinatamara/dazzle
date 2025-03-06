const { UserProfile, User, Item, Category } = require("../models");

class ItemController {
  static async dashboard(req, res) {
    try {
      let { userId, role } = req.session;

      let info = {
        isLoggedIn: false,
        isAdmin: false,
        profile: false,
      };
      userId = 1;
      role = "admin";
      if (userId) {
        info.isLoggedIn = true;
        if (role === "admin") {
          info.isAdmin = true;
        }
        let userProfile = await UserProfile.findOne({
          where: { UserId: +userId },
        });
        if (userProfile) {
          info.profile = true;
        }
      }
      let data = await Item.findAll({ include: Category });
      res.render("dashboard", { data, info, userId });
    } catch (error) {
      res.send(error);
    }
  }
  static async addItemForm(req, res) {
    try {
      let { userId, role } = req.session;
      let info = {
        isLoggedIn: false,
        isAdmin: false,
        profile: false,
      };
      userId = 1;
      role = "admin";
      if (userId) {
        info.isLoggedIn = true;
        if (role === "admin") {
          info.isAdmin = true;
        }
        let userProfile = await UserProfile.findOne({
          where: { UserId: +userId },
        });
        if (userProfile) {
          info.profile = true;
        }
      }
      let categories = await Category.findAll();
      res.render("addItem", { categories, info, userId });
    } catch (error) {
      res.send(error);
    }
  }
  static async postItemForm(req, res) {
    try {
      await Item.create(req.body);
      res.redirect("/dashboard");
    } catch (error) {
      res.send(error);
    }
  }
  static async getEditItem(req, res) {
    try {
      let { userId, role } = req.session;
      let { id } = req.params;
      let info = {
        isLoggedIn: false,
        isAdmin: false,
        profile: false,
      };
      userId = 1;
      role = "admin";
      if (userId) {
        info.isLoggedIn = true;
        if (role === "admin") {
          info.isAdmin = true;
        }
        let userProfile = await UserProfile.findOne({
          where: { UserId: +userId },
        });
        if (userProfile) {
          info.profile = true;
        }
      }
      let data = await Item.findByPk(+id);
      let categories = await Category.findAll();
      res.render("editItem", { data, categories, info, userId });
    } catch (error) {
      res.send(error);
    }
  }
  static async postEditItem(req, res) {
    try {
      let { id } = req.params;
      await Item.update(req.body, { where: { id: +id } });
      res.redirect("/dashboard");
    } catch (error) {
      res.send(error);
    }
  }
  static async deleteItem(req, res) {
    try {
      let { id } = req.params;
      await Item.destroy({
        where: {
          id: +id,
        },
      });
      res.redirect("/dashboard");
    } catch (error) {
      res.send(error);
    }
  }
}

module.exports = ItemController;
