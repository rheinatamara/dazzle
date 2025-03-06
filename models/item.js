"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Item extends Model {
    static associate(models) {
      Item.belongsTo(models.Category, { foreignKey: "CategoryId" });
      Item.hasMany(models.Favorite, { foreignKey: "ItemId" });
      Item.hasMany(models.OrderItem, { foreignKey: "ItemId" });
    }
    get formatPrice() {
      return `$${this.price}`;
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
      title: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Title is required",
          },
        },
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Description is required",
          },
        },
      },
      price: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Price is required",
          },
        },
      },
      stock: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Stock is required",
          },
        },
      },
      photoURL: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Photo is required",
          },
        },
      },
      CategoryId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Categories",
          key: "id",
        },
        validate: {
          notEmpty: {
            msg: "Category is required",
          },
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
