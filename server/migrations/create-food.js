"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("food", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING,
      },
      calories: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      protein: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      carbs: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      fats: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      weight: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      image: {
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
    await queryInterface.dropTable("food");
  },
};
