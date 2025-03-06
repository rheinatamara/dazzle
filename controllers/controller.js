const {
  Category,
  Item,
  Favorite,
  User,
  Order,
  UserProfile,
} = require("../models");
class Controller {
  static async landingPage(req, res) {
    try {
      let { userId, role } = req.session;

      let info = {
        isLoggedIn: false,
        isAdmin: false,
        profile: false,
      };
      if (userId) {
        info.isLoggedIn = true;
        if (role === "admin") {
          info.isAdmin = true;
        }
        let userProfile = await UserProfile.findOne({
          where: { UserId: userId },
        });
        if (userProfile) {
          info.profile = true;
        }
      }

      const items = await Item.findAll({
        limit: 3,
        order: [["createdAt", "DESC"]],
      });

      const data = await Category.findAll();
      console.log(info, "<<");

      res.render("landingPage", { data, items, info, userId });
    } catch (error) {
      res.send(error);
    }
  }

  static async allItems(req, res) {
    try {
      let { userId, role } = req.session;

      let info = {
        isLoggedIn: false,
        isAdmin: false,
        profile: false,
      };
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
      const data = await Item.findAll({
        order: [["createdAt", "DESC"]],
      });
      res.render("items", { data, info, userId });
    } catch (error) {
      res.send(error);
    }
  }
  static async categoryItems(req, res) {
    try {
      let { id } = req.params;
      let { userId, role } = req.session;

      let info = {
        isLoggedIn: false,
        isAdmin: false,
        profile: false,
      };
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
      let data = await Category.findByPk(+id, {
        include: Item,
      });
      res.render("category", { data, info, userId });
    } catch (error) {
      res.send(error);
    }
  }
  static async itemDetail(req, res) {
    try {
      const { id } = req.params;
      let { userId, role } = req.session;

      let info = {
        isLoggedIn: false,
        isAdmin: false,
        profile: false,
      };
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
      let isLogin = !!userId;
      let isFavorited = false;
      const data = await Item.findByPk(+id, { include: Category });
      if (!data) return res.send("Item not found");
      if (isLogin) {
        isFavorited = await Item.isFavorite(userId, id);
      }
      res.render("detailPage", { data, isLogin, isFavorited, info, userId });
    } catch (error) {
      res.send(error);
    }
  }
}

module.exports = Controller;
