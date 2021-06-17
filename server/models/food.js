"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Food extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Food.init(
    {
      name: DataTypes.STRING,
      calories: DataTypes.INTEGER,
      protein: DataTypes.INTEGER,
      carbs: DataTypes.INTEGER,
      fats: DataTypes.INTEGER,
      image: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Food",
      tableName: "food",
      underscored: true,
    }
  );
  return Food;
};
