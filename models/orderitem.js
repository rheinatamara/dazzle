"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class OrderItem extends Model {
    static associate(models) {
      OrderItem.belongsTo(models.Order, { foreignKey: "OrderId" });
      OrderItem.belongsTo(models.Item, { foreignKey: "ItemId" });
    }
  }
  OrderItem.init(
    {
      OrderId: {
        type: DataTypes.INTEGER,
        references: {
          model: "Orders",
          key: "id",
        },
      },
      ItemId: {
        type: DataTypes.INTEGER,
        references: {
          model: "Items",
          key: "id",
        },
      },
      quantity: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "OrderItem",
    }
  );
  return OrderItem;
};
