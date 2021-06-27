"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  // const WorkoutExerciseJoin = sequelize.define("WorkoutExerciseJoin", {
  //   id: { type: DataTypes.INTEGER, primaryKey: true },
  //   exercise_id: { type: DataTypes.INTEGER, primaryKey: true },
  //   workout_id: { type: DataTypes.INTEGER, primaryKey: true },
  //   index: { type: DataTypes.INTEGER },
  // });
  class WorkoutExerciseJoin extends Model {
    static associate(models) {}
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
