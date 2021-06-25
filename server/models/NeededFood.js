"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class NeededFood extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Trainee, {
        foreignKey: "trainee_id",
        targetKey: "id",
      });
      this.hasOne(models.Food, {
        foreignKey: "name",
        sourceKey: "food_name",
      });
    }
  }

  NeededFood.init(
    {
      trainee_id: DataTypes.INTEGER,
      food_name: DataTypes.STRING,
      meal_of_the_day: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "NeededFood",
      tableName: "needed_food",
      underscored: true,
    }
  );
  return NeededFood;
};
