"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class food_meal_join extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  food_meal_join.init(
    {
      meal_id: DataTypes.INTEGER,
      food_name: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "food_meal_join",
    }
  );
  return food_meal_join;
};
