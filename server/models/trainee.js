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
    }
  }
  Trainee.init(
    {
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      coach_id: DataTypes.INTEGER,
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
