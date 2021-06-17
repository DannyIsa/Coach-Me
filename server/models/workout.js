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
      this.belongsTo(models.Workout_exercise_join, {
        foreignKey: "id",
        targetKey: "Workout_id",
      });
      this.belongsTo(models.coach, {
        foreignKey: "coach_id",
        targetKey: "id",
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
      tableName: "workout",
      underscored: true,
    }
  );
  return Workout;
};
