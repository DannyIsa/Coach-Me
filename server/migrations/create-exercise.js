"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("exercises", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        primaryKey: true,
        allowNull: false,
        type: Sequelize.STRING,
      },
      muscle: {
        type: Sequelize.STRING,
      },
      image: {
        type: Sequelize.STRING,
      },
      type: {
        type: Sequelize.STRING,
      },
      videos: {
        type: Sequelize.STRING,
      },
      description: {
        type: Sequelize.STRING,
      },
      equipment: {
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
    await queryInterface.dropTable("exercises");
  },
};
