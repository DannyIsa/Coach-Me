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
      this.belongsToMany(models.Trainee, {
        through: models.NeedToEat,
        sourceKey: "id",
        foreignKey: "food_id",
        onDelete: "cascade",
      });
      this.belongsToMany(models.Trainee, {
        through: models.EatenFood,
        sourceKey: "id",
        foreignKey: "food_id",
        onDelete: "cascade",
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
