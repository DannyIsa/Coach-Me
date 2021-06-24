"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class NeededFoodToEat extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasOne(models.Trainee, {
        foreignKey: "id",
        sourceKey: "trainee_id",
      });
      this.hasOne(models.Food, {
        foreignKey: "id",
        sourceKey: "food_id",
      });
    }
  }

  NeededFoodToEat.init(
    {
      trainee_id: DataTypes.INTEGER,
      food_id: DataTypes.INTEGER,
      meal_of_the_day: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "NeededFoodToEat",
      tableName: "needed_food_to_eat",
      underscored: true,
    }
  );
  return NeededFoodToEat;
};
