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
      this.hasMany(models.DietLog, {
        sourceKey: "id",
        foreignKey: "id",
      });
      this.hasOne(models.CoachRequest, {
        foreignKey: "trainee_id",
        sourceKey: "id",
      });
      this.belongsToMany(models.Meal, { through: "trainee_meal_joins" });
    }
  }
  Trainee.init(
    {
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      coach_id: DataTypes.INTEGER,
      phone_number: DataTypes.STRING,
      birthdate: DataTypes.DATE,
      gender: DataTypes.STRING,
      height: DataTypes.FLOAT,
      weight: DataTypes.INTEGER,
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
