const { decode } = require("../helpers/bcrypt");
const { Category, Item, User } = require("../models");

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
