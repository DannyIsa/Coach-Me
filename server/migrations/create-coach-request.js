"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("coach_requests", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      coach_id: {
        primaryKey: true,
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      trainee_id: {
        primaryKey: true,
        unique: true,
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      content: {
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
    await queryInterface.dropTable("coach_requests");
  },
};
