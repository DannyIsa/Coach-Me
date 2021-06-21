"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Coach extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasMany(models.Workout, {
        sourceKey: "id",
        foreignKey: "coach_id",
      });
      this.hasMany(models.Trainee, {
        sourceKey: "id",
        foreignKey: "coach_id",
      });
      this.hasMany(models.CoachRequest, {
        foreignKey: "coach_id",
        sourceKey: "id",
      });
    }
  }
  Coach.init(
    {
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      phone_number: DataTypes.STRING,
      birthdate: DataTypes.DATEONLY,
      gender: DataTypes.STRING,
      avg_rating: DataTypes.FLOAT,
      rating_count: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Coach",
      tableName: "coaches",
      underscored: true,
    }
  );
  return Coach;
};
