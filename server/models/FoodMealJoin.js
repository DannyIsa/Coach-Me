"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class FoodMealJoin extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Food, {
        foreignKey: "food_name",
        targetKey: "name",
      });
      this.belongsTo(models.Meal, {
        foreignKey: "meal_id",
        targetKey: "id",
      });
    }
  }
  FoodMealJoin.init(
    {
      meal_id: DataTypes.INTEGER,
      food_name: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "FoodMealJoin",
      tableName: "food_meal_joins",
      underscored: true,
    }
  );
  return FoodMealJoin;
};
