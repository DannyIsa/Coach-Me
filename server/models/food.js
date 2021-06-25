"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Food extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.NeededFood, {
        targetKey: "food_name",
        foreignKey: "name",
      });
      this.belongsTo(models.EatenFood, {
        targetKey: "food_name",
        foreignKey: "name",
      });
    }
  }
  Food.init(
    {
      name: DataTypes.STRING,
      calories: DataTypes.INTEGER,
      protein: DataTypes.INTEGER,
      carbs: DataTypes.INTEGER,
      fats: DataTypes.INTEGER,
      weight: DataTypes.INTEGER,
      image: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Food",
      tableName: "food",
      underscored: true,
    }
  );
  return Food;
};
