"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("needed_food", {
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
      food_id: {
        primaryKey: true,
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      meal_of_the_day: {
        type: Sequelize.STRING,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("needed_food");
  },
};
