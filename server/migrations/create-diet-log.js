"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("diet_logs", {
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
      total_calories: {
        type: Sequelize.INTEGER,
      },
      used_calories: {
        type: Sequelize.INTEGER,
      },
      total_protein: {
        type: Sequelize.INTEGER,
      },
      used_protein: {
        type: Sequelize.INTEGER,
      },
      total_carbs: {
        type: Sequelize.INTEGER,
      },
      used_carbs: {
        type: Sequelize.INTEGER,
      },
      total_fat: {
        type: Sequelize.INTEGER,
      },
      used_fat: {
        type: Sequelize.INTEGER,
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
    await queryInterface.dropTable("diet_logs");
  },
};
