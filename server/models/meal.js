'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Meal extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Meal.init({
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    calories: DataTypes.INTEGER,
    carbs: DataTypes.INTEGER,
    protein: DataTypes.INTEGER,
    fats: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Meal',
  });
  return Meal;
};