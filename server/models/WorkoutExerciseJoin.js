"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class WorkoutExerciseJoin extends Model {
    static associate(models) {
      this.hasMany(models.Workout, {
        foreignKey: "id",
        targetKey: "workout_id",
        onDelete: "cascade",
      });
      this.hasMany(models.ExerciseSet, {
        foreignKey: "id",
        targetKey: "exercise_id",
        onDelete: "cascade",
      });
    }
  }
  WorkoutExerciseJoin.init(
    {
      exercise_id: DataTypes.INTEGER,
      workout_id: DataTypes.INTEGER,
      index: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "WorkoutExerciseJoin",
      tableName: "workout_exercise_joins",
      underscored: true,
    }
  );
  return WorkoutExerciseJoin;
};
