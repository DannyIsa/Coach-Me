"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class exercise extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.exercise_set, {
        foreignKey: "name",
        targetKey: "exercise",
      });
    }
  }
  exercise.init(
    {
      name: DataTypes.STRING,
      muscle: DataTypes.STRING,
      image: DataTypes.STRING,
      type: DataTypes.STRING,
      videos: DataTypes.STRING,
      description: DataTypes.STRING,
      equipment: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "exercise",
    }
  );
  return exercise;
};
