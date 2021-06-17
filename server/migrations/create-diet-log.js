'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('diet_logs', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      trainee_id: {
        type: Sequelize.INTEGER
      },
      total_calories: {
        type: Sequelize.INTEGER
      },
      used_calories: {
        type: Sequelize.INTEGER
      },
      total_protein: {
        type: Sequelize.INTEGER
      },
      used_protein: {
        type: Sequelize.INTEGER
      },
      total_carbs: {
        type: Sequelize.INTEGER
      },
      used_carbs: {
        type: Sequelize.INTEGER
      },
      total_fat: {
        type: Sequelize.INTEGER
      },
      used_fat: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('diet_logs');
  }
};