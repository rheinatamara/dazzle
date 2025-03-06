const { UserProfile, User, Item, Category } = require("../models");

class ItemController {
  static async dashboard(req, res) {
    try {
      let { userId, role } = req.session;
      let { deleted } = req.query;
      let info = {
        isLoggedIn: false,
        isAdmin: false,
        profile: false,
      };
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
      res.render("dashboard", { data, info, userId, deleted });
    } catch (error) {
      res.send(error);
    }
  }
  static async addItemForm(req, res) {
    try {
      let { userId, role } = req.session;
      let { errors } = req.query;
      let info = {
        isLoggedIn: false,
        isAdmin: false,
        profile: false,
      };
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
      if (errors) {
        errors = errors.split(",");
      }
      let categories = await Category.findAll();
      res.render("addItem", { categories, info, userId, errors });
    } catch (error) {
      res.send(error);
    }
  }
  static async postItemForm(req, res) {
    try {
      await Item.create(req.body);
      res.redirect("/dashboard");
    } catch (error) {
      if (
        error.name === "SequelizeValidationError" ||
        error.name === "SequelizeUniqueConstraintError" ||
        error.name === "SequelizeDatabaseError"
      ) {
        error = error.errors.map((el) => {
          return el.message;
        });
        res.redirect(`/dashboard/add?errors=${error}`);
      } else {
        res.send(error);
      }
    }
  }
  static async getEditItem(req, res) {
    try {
      let { userId, role } = req.session;
      let { id } = req.params;
      let { errors } = req.query;
      let info = {
        isLoggedIn: false,
        isAdmin: false,
        profile: false,
      };
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
      if (errors) {
        errors = errors.split(",");
      }
      let data = await Item.findByPk(+id);
      let categories = await Category.findAll();
      console.log(errors);
      res.render("editItem", { data, categories, info, userId, errors });
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
      if (
        error.name === "SequelizeValidationError" ||
        error.name === "SequelizeUniqueConstraintError" ||
        error.name === "SequelizeDatabaseError"
      ) {
        error = error.errors.map((el) => {
          return el.message;
        });
        res.redirect(`/dashboard/${req.params.id}/edit?errors=${error}`);
      } else {
        res.send(error);
      }
    }
  }
  static async deleteItem(req, res) {
    try {
      let { id } = req.params;
      let foundItem = await Item.findByPk(+id);

      await Item.destroy({
        where: {
          id: +id,
        },
      });
      res.redirect(`/dashboard?deleted=${foundItem.title}`);
    } catch (error) {
      res.send(error);
    }
  }
}

module.exports = ItemController;
