const { Category } = require("../models");
class Controller {
  static async landingPage(req, res) {
    try {
      let data = await Category.findAll();
      res.render("landingPage", { data });
    } catch (error) {
      res.send(error);
    }
  }
}

module.exports = Controller;
