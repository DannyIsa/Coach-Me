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
      // define association here
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
