"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class ExerciseSet extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasMany(models.exercise, {
        sourceKey: "name",
        foreignKey: "name",
      });
      this.belongsTo(models.workout_exercise_join, {
        foreignKey: "id",
        targetKey: "exercise_id",
      });
    }
  }
  ExerciseSet.init(
    {
      name: DataTypes.STRING,
      min_reps: DataTypes.INTEGER,
      max_reps: DataTypes.INTEGER,
      sets: DataTypes.INTEGER,
      added_weight: DataTypes.INTEGER,
      rest: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "ExerciseSet",
      tableName: "exercise_sets",
      underscored: true,
    }
  );
  return ExerciseSet;
};
