"use strict";
const { Model } = require("sequelize");
const { encode } = require("../helpers/bcrypt");

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.hasOne(models.UserProfile, { foreignKey: "UserId" });
      User.hasMany(models.Order, { foreignKey: "UserId" });
      User.hasMany(models.Favorite, { foreignKey: "UserId" });
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
      hooks: {
        beforeCreate: (user, option) => {
          user.password = encode(user.password);
        },
      },
    }
  );
  return User;
};
