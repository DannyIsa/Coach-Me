"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Trainee extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Coach, {
        foreignKey: "coach_id",
        targetKey: "id",
      });
      this.hasMany(models.WorkoutLog, {
        sourceKey: "id",
        foreignKey: "id",
      });
      this.hasMany(models.MeasureLog, {
        sourceKey: "id",
        foreignKey: "id",
      });

      this.hasOne(models.CoachRequest, {
        foreignKey: "trainee_id",
        sourceKey: "id",
      });
      this.hasMany(models.NeededFoodToEat, {
        sourceKey: "id",
        foreignKey: "trainee_id",
      });
      this.hasMany(models.EatenFood, {
        sourceKey: "id",
        foreignKey: "trainee_id",
      });
    }
  }
  Trainee.init(
    {
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      coach_id: DataTypes.INTEGER,
      phone_number: DataTypes.STRING,
      birthdate: DataTypes.DATEONLY,
      gender: DataTypes.STRING,
      height: DataTypes.FLOAT,
      weight: DataTypes.INTEGER,
      daily_calorie_goal: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Trainee",
      tableName: "trainees",
      underscored: true,
    }
  );
  return Trainee;
};
