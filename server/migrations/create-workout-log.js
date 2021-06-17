"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("workout_logs", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      trainee_id: {
        primaryKey: true,
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      workout_id: {
        primaryKey: true,
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      time: {
        type: Sequelize.TIME,
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("workout_logs");
  },
};
