"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class UserProfile extends Model {
    static associate(models) {
      UserProfile.belongsTo(models.User, { foreignKey: "UserId" });
    }
  }
  UserProfile.init(
    {
      fullName: DataTypes.STRING,
      address: DataTypes.TEXT,
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
      modelName: "UserProfile",
      hooks: {
        beforeCreate: (input, option) => {
          input.fullName = "Your_full_name";
          input.address = "Your_full_address";
        },
      },
    }
  );
  return UserProfile;
};
