"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.hasOne(models.UserProfile, { foreignKey: "UserId" });
      User.hasOne(models.Cart, { foreignKey: "UserId" });
      User.belongsToMany(models.Item, {
        through: Favorite,
        foreignKey: "UserId",
        otherKey: "ItemId",
      });
    }
  }
  User.init(
    {
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      role: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  return User;
};
