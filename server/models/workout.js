"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class workout extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.workout_exercise_join, {
        foreignKey: "id",
        targetKey: "workout_id",
      });
      this.belongsTo(models.coach, {
        foreignKey: "coach_id",
        targetKey: "id",
      });
    }
  }
  workout.init(
    {
      name: DataTypes.STRING,
      coach_id: DataTypes.INTEGER,
      sets: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "workout",
      tableName: "workouts",
      underscored: true,
    }
  );
  return workout;
};
