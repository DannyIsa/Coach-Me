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
        onDelete: "cascade",
      });
      this.hasMany(models.Trainee, {
        sourceKey: "id",
        foreignKey: "coach_id",
        onDelete: "cascade",
      });
      this.hasMany(models.CoachRequest, {
        foreignKey: "coach_id",
        sourceKey: "id",
        onDelete: "cascade",
      });
      this.hasMany(models.Chat, {
        sourceKey: "id",
        foreignKey: "coach_id",
        onDelete: "cascade",
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
      image: DataTypes.STRING,
      city: DataTypes.STRING,
      expertise: DataTypes.STRING,
      online_coaching: DataTypes.STRING,
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
