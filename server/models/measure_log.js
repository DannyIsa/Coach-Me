'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class measure_log extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  measure_log.init({
    traniee_id: DataTypes.INTEGER,
    weight: DataTypes.FLOAT,
    chest_perimeter: DataTypes.FLOAT,
    hip_perimeter: DataTypes.FLOAT,
    bicep_perimeter: DataTypes.FLOAT,
    thigh_perimeter: DataTypes.FLOAT,
    waist_perimeter: DataTypes.FLOAT
  }, {
    sequelize,
    modelName: 'measure_log',
  });
  return measure_log;
};