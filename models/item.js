"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Item extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Item.belongsTo(models.Category, { foreignKey: "CategoryId" });
      Item.hasMany(models.Favorite, { foreignKey: "ItemId" });
      Item.hasMany(models.OrderItem, { foreignKey: "ItemId" });
    }
  }
  Item.init(
    {
      title: DataTypes.STRING,
      description: DataTypes.TEXT,
      price: DataTypes.INTEGER,
      stock: DataTypes.INTEGER,
      photoURL: DataTypes.STRING,
      CategoryId: {
        type: DataTypes.INTEGER,
        references: {
          model: "Categories",
          key: "id",
        },
      },
    },
    {
      sequelize,
      modelName: "Item",
    }
  );
  return Item;
};
