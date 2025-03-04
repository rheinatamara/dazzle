"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Item extends Model {
    static associate(models) {
      Item.belongsTo(models.Category, { foreignKey: "CategoryId" });
      Item.belongsToMany(models.User, {
        through: "Favorite",
        foreignKey: "ItemId",
        otherKey: "UserId",
      });
      Item.belongsToMany(models.Cart, {
        through: CartItem,
        foreignKey: "ItemId",
        otherKey: "CartId",
      });
    }
  }
  Item.init(
    {
      title: DataTypes.STRING,
      description: DataTypes.TEXT,
      price: DataTypes.INTEGER,
      stock: DataTypes.INTEGER,
      photoUrl: DataTypes.STRING,
      UserId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Users",
          key: "id",
        },
        onDelete: "CASCADE",
      },
      CategoryId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Categories",
          key: "id",
        },
        onDelete: "CASCADE",
      },
    },
    {
      sequelize,
      modelName: "Item",
    }
  );
  return Item;
};
