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
        references: {
          model: "Users",
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
    },
    {
      sequelize,
      modelName: "Favorite",
    }
  );
  return Favorite;
};
