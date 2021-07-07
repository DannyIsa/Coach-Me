"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class WorkoutLog extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Trainee, {
        targetKey: "id",
        foreignKey: "trainee_id",
        onDelete: "cascade",
      });
      this.belongsTo(models.Workout, {
        targetKey: "id",
        foreignKey: "workout_id",
        onDelete: "cascade",
      });
    }
  }
  WorkoutLog.init(
    {
      trainee_id: DataTypes.INTEGER,
      workout_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "WorkoutLog",
      tableName: "workout_logs",
      underscored: true,
    }
  );
  return WorkoutLog;
};
