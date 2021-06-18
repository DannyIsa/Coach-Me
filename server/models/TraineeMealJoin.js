"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class TraineeMealJoin extends Model {
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
      this.belongsTo(models.Meal, {
        foreignKey: "meal_id",
        targetKey: "id",
      });
    }
  }
  TraineeMealJoin.init(
    {
      trainee_id: DataTypes.INTEGER,
      meal_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "TraineeMealJoin",
      tableName: "trainee_meal_joins",
      underscored: true,
    }
  );
  return TraineeMealJoin;
};