"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Meal extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsToMany(models.Food, { through: "food_meal_joins" });
      this.belongsToMany(models.Trainee, { through: "trainee_meal_joins" });
    }
  }
  Meal.init(
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
      modelName: "Meal",
      tableName: "meals",
      underscored: true,
    }
  );
  return Meal;
};
