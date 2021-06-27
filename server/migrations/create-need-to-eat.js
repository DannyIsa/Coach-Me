"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("need_to_eat", {
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
      food_name: {
        primaryKey: true,
        allowNull: false,
        type: Sequelize.STRING,
      },
      food_id: {
        primaryKey: true,
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      food_calories: {
        primaryKey: true,
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      food_protein: {
        primaryKey: true,
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      food_carbs: {
        primaryKey: true,
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      food_fats: {
        primaryKey: true,
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      meal_of_the_day: {
        type: Sequelize.STRING,
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
    await queryInterface.dropTable("need_to_eat");
  },
};
