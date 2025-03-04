"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Favorite extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
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
