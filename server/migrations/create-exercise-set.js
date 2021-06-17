"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("exercise_sets", {
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
      min_reps: {
        type: Sequelize.INTEGER,
      },
      max_reps: {
        type: Sequelize.INTEGER,
      },
      sets: {
        type: Sequelize.INTEGER,
      },
      rest: {
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
    await queryInterface.dropTable("exercise_sets");
  },
};
