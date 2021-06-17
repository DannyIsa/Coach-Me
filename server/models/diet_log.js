"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class diet_log extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  diet_log.init(
    {
      trainee_id: DataTypes.INTEGER,
      total_calories: DataTypes.INTEGER,
      used_calories: DataTypes.INTEGER,
      total_protein: DataTypes.INTEGER,
      used_protein: DataTypes.INTEGER,
      total_carbs: DataTypes.INTEGER,
      used_carbs: DataTypes.INTEGER,
      total_fat: DataTypes.INTEGER,
      used_fat: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "diet_log",
      tableName: "diet_logs",
      underscored: true,
    }
  );
  return diet_log;
};
