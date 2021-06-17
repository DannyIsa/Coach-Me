"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class meal extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  meal.init(
    {
      name: DataTypes.STRING,
      description: DataTypes.STRING,
      calories: DataTypes.INTEGER,
      carbs: DataTypes.INTEGER,
      protein: DataTypes.INTEGER,
      fats: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "meal",
      tableName: "meals",
      underscored: true,
    }
  );
  return meal;
};
