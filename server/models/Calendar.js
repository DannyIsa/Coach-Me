"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Calendar extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Trainee, {
        foreignKey: "trainee_id",
        targetKey: "id",
        onDelete: "cascade",
      });
      this.belongsTo(models.Workout, {
        targetKey: "id",
        foreignKey: "workout_id",
        onDelete: "cascade",
      });
    }
  }
  Calendar.init(
    {
      trainee_id: DataTypes.INTEGER,
      workout_id: DataTypes.INTEGER,
      day: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Calendar",
      tableName: "calendars",
      underscored: true,
    }
  );
  return Calendar;
};
