"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class WorkoutExerciseJoin extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Workout, {
        foreignKey: "workout_id",
        targetKey: "id",
      });
      this.belongsTo(models.ExerciseSet, {
        foreignKey: "exercise_id",
        targetKey: "id",
      });
    }
  }
  WorkoutExerciseJoin.init(
    {
      exercise_id: DataTypes.INTEGER,
      workout_id: DataTypes.INTEGER,
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
