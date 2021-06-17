'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class workout_log extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  workout_log.init({
    trainee_id: DataTypes.INTEGER,
    added_weight: DataTypes.INTEGER,
    time: DataTypes.TIME
  }, {
    sequelize,
    modelName: 'workout_log',
  });
  return workout_log;
};