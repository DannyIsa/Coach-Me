"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class CoachRequest extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Trainee, {
        foreignKey: "trainee_id",
        targetKey: "id",
      });
      this.belongsTo(models.Coach, {
        foreignKey: "coach_id",
        targetKey: "id",
      });
    }
  }
  CoachRequest.init(
    {
      coach_id: DataTypes.INTEGER,
      trainee_id: DataTypes.INTEGER,
      content: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "CoachRequest",
      tableName: "coach_requests",
      underscored: true,
    }
  );
  return CoachRequest;
};
