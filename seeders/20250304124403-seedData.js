"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const categories = require("../data/categories.json").map((el) => {
      delete el.id;
      el.createdAt = el.updatedAt = new Date();
      return el;
    });
    const users = require("../data/users.json").map((el) => {
      el.createdAt = el.updatedAt = new Date();
      return el;
    });
    const items = require("../data/items.json").map((el) => {
      el.createdAt = el.updatedAt = new Date();
      return el;
    });
    await queryInterface.bulkInsert("Categories", categories);
    await queryInterface.bulkInsert("Users", users);
    await queryInterface.bulkInsert("Items", items);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Categories", null, {});
    await queryInterface.bulkDelete("Users", null, {});
    await queryInterface.bulkDelete("Items", null, {});
  },
};
