"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Cart extends Model {
    static associate(models) {
      Cart.belongsTo(models.User, { foreignKey: "UserId" });
      Cart.belongsToMany(models.Item, {
        through: models.CartItem,
        foreignKey: "ItemId",
        otherKey: "CartId",
      });
    }
  }
  Cart.init(
    {
      status: DataTypes.STRING,
      UserId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Users",
          key: "id",
        },
        onDelete: "CASCADE",
      },
    },
    {
      sequelize,
      modelName: "Cart",
    }
  );
  return Cart;
};
