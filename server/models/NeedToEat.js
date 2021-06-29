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
        onDelete: "cascade",
      });
      this.hasOne(models.Food, {
        foreignKey: "food_id",
        sourceKey: "id",
        onDelete: "cascade",
      });
    }
  }

  NeededFood.init(
    {
      trainee_id: DataTypes.INTEGER,
      food_id: DataTypes.INTEGER,
      meal_of_the_day: DataTypes.STRING,
      amount: DataTypes.INTEGER,
      day: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "NeedToEat",
      tableName: "need_to_eat",
      underscored: true,
    }
  );
  return NeededFood;
};
