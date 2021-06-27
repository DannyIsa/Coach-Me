"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("workout_exercise_joins", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      exercise_id: {
        primaryKey: true,
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      workout_id: {
        primaryKey: true,
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      index: {
        type: Sequelize.INTEGER,
        allowNull: false,
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
    await queryInterface.dropTable("workout_exercise_joins");
  },
};
