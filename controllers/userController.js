const { decode } = require("../helpers/bcrypt");
const { Category, Item, User, Favorite } = require("../models");

class UserController {
  static registerForm(req, res) {
    res.render("register");
  }
  static loginForm(req, res) {
    res.render("login");
  }

  static async postRegister(req, res) {
    try {
      await User.create(req.body);
      res.redirect("/login");
    } catch (error) {
      res.send(error);
    }
  }
  static async postLogin(req, res) {
    try {
      let { email, password } = req.body;
      let foundUser = await User.findOne({ where: { email } });
      if (!foundUser) {
        res.send("User not found");
      } else {
        const match = decode(password, foundUser.password);
        if (!match) {
          res.send("Incorrect email or password");
        } else {
          req.session.userId = foundUser.id;
          req.session.role = foundUser.role;
          res.redirect("/");
        }
      }
    } catch (error) {
      res.send(error);
    }
  }

  static async getProfilePage(req, res) {
    try {
      console.log("profile page");
    } catch (error) {
      res.send(error);
    }
  }
  static async postProfilePage(req, res) {
    try {
      console.log("post profile page");
    } catch (error) {
      res.send(error);
    }
  }
  static async addToFavorite(req, res) {
    try {
      let { userId } = req.session;
      let { id } = req.params;
      await Favorite.create({ UserId: +userId, ItemId: +id });
      res.redirect(`/detail/${+id}`);
    } catch (error) {
      res.send(error);
    }
  }
  static async deleteFavorite(req, res) {
    try {
      let { id } = req.params;
      await Favorite.destroy({ where: { ItemId: +id } });
      res.redirect(`/detail/${+id}`);
    } catch (error) {
      res.send(error);
    }
  }
  static async deleteFromFavorite(req, res) {
    try {
      let { id } = req.params;
      await Favorite.destroy({ where: { ItemId: +id } });
      res.redirect(`/favorites`);
    } catch (error) {
      res.send(error);
    }
  }
  static async favoritePage(req, res) {
    try {
      let { userId } = req.session;
      let data = await Favorite.findAll({
        include: Item,
        where: { UserId: +userId },
      });
      res.render("favorite", { data });
    } catch (error) {
      res.send(error);
    }
  }
  static async logOut(req, res) {
    try {
      req.session.destroy();
      res.redirect("/login");
    } catch (error) {
      res.send(error);
    }
  }
}

module.exports = UserController;
