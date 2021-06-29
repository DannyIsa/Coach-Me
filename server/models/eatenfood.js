"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class EatenFood extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Trainee, {
        foreignKey: "trainee_id",
        targetKey: "id",
        onDelete: "cascade",
      });
      this.hasOne(models.Food, {
        foreignKey: "id",
        sourceKey: "food_id",
        onDelete: "cascade",
      });
    }
  }
  EatenFood.init(
    {
      trainee_id: DataTypes.INTEGER,
      food_id: DataTypes.INTEGER,
      meal_of_the_day: DataTypes.STRING,
      amount: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "EatenFood",
      tableName: "eaten_food",
      underscored: true,
    }
  );
  return EatenFood;
};
