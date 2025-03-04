"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class CartDetail extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  CartDetail.init(
    {
      quantity: DataTypes.INTEGER,
      CartId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Carts",
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
      modelName: "CartDetail",
    }
  );
  return CartDetail;
};
