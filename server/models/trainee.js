"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class trainee extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  trainee.init(
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
      modelName: "trainee",
    }
  );
  return trainee;
};
