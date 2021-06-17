'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class workout_exercise_join extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  workout_exercise_join.init({
    set_id: DataTypes.INTEGER,
    exercise_id: DataTypes.INTEGER,
    workout_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'workout_exercise_join',
  });
  return workout_exercise_join;
};