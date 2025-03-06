"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    static associate(models) {
      Order.belongsTo(models.User, { foreignKey: "UserId" });
      Order.hasMany(models.OrderItem, { foreignKey: "OrderId" });
    }
  }
  Order.init(
    {
      status: DataTypes.STRING,
      UserId: {
        type: DataTypes.INTEGER,
        references: {
          model: "Users",
          key: "id",
        },
      },
    },
    {
      sequelize,
      modelName: "Order",
      hooks: {
        beforeCreate: (input, option) => {
          input.status = "pending";
        },
      },
    }
  );
  return Order;
};
