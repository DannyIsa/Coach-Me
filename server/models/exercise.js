"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Exercise extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.ExerciseSet, {
        foreignKey: "name",
        targetKey: "name",
        onDelete: "cascade",

      });
    }
  }
  Exercise.init(
    {
      name: DataTypes.STRING,
      muscle: DataTypes.STRING,
      image: DataTypes.STRING,
      type: DataTypes.STRING,
      description: DataTypes.STRING,
      equipment: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Exercise",
      tableName: "exercises",
      underscored: true,
    }
  );
  return Exercise;
};
