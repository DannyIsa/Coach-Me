"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class workout_exercise_join extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasMany(models.exercise_set, {
        sourceKey: "exercise_id",
        foreignKey: "id",
      });
      this.hasMany(models.workout, {
        sourceKey: "workout_id",
        foreignKey: "id",
      });
    }
  }
  workout_exercise_join.init(
    {
      exercise_id: DataTypes.INTEGER,
      workout_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "workout_exercise_join",
      tableName: "workout_exercise_joins",
      underscored: true,
    }
  );
  return workout_exercise_join;
};
