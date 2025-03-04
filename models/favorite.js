"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Favorite extends Model {
    static associate(models) {
      Favorite.belongsTo(models.User, { foreignKey: "UserId" });
      Favorite.belongsTo(models.Item, { foreignKey: "ItemId" });
    }
  }
  Favorite.init(
    {
      UserId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Users",
          key: "id",
        },
        onDelete: "CASCADE",
      },
      ItemId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Items",
          key: "id",
        },
        onDelete: "CASCADE",
      },
    },
    {
      sequelize,
      modelName: "Favorite",
    }
  );
  return Favorite;
};
