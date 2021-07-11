"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Chat extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Trainee, {
        foreignKey: "id",
        onDelete: "cascade",
      });
      this.belongsTo(models.Coach, {
        foreignKey: "id",
        onDelete: "cascade",
      });
    }
  }
  Chat.init(
    {
      trainee_id: DataTypes.INTEGER,
      coach_id: DataTypes.INTEGER,
      content: DataTypes.STRING,
      sender: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Chat",
      tableName: "chats",
      underscored: true,
    }
  );
  return Chat;
};
