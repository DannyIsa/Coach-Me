"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Workout extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsToMany(models.ExerciseSet, {
        through: models.WorkoutExerciseJoin,
        onDelete: "cascade",
      });
      this.belongsTo(models.Coach, {
        foreignKey: "coach_id",
        targetKey: "id",
        onDelete: "cascade",
      });
      this.hasMany(models.WorkoutLog, {
        foreignKey: "id",
        sourceKey: "id",
        onDelete: "cascade",
      });
    }
  }
  Workout.init(
    {
      name: DataTypes.STRING,
      coach_id: DataTypes.INTEGER,
      sets: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Workout",
      tableName: "workouts",
      underscored: true,
    }
  );
  return Workout;
};
