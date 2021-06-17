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
      this.hasMany(models.workout, {
        sourceKey: "id",
        foreignKey: "coach_id",
      });
      this.hasMany(models.trainee, {
        sourceKey: "id",
        foreignKey: "coach_id",
      });
    }
  }
  Coach.init(
    {
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      address: DataTypes.STRING,
      phone_number: DataTypes.STRING,
      rating: DataTypes.FLOAT,
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
