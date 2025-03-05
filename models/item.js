"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Item extends Model {
    static associate(models) {
      Item.belongsTo(models.Category, { foreignKey: "CategoryId" });
      Item.hasMany(models.Favorite, { foreignKey: "ItemId" });
      Item.hasMany(models.OrderItem, { foreignKey: "ItemId" });
    }
    static async isFavorite(userId, itemId) {
      try {
        let favorite = false;
        const found = await sequelize.models.Favorite.findOne({
          where: { UserId: userId, ItemId: itemId },
        });
        if (found) {
          favorite = true;
        }
        return favorite;
      } catch (error) {
        throw error;
      }
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
